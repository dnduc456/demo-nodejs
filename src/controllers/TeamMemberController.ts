import * as Hapi from 'hapi';
import Logger from "@utils/logger";
import _ from "lodash";
import * as Httpcode from "@enum/Httpcode";
import * as Error from '@utils/error';
import DirectorRepository from "@repositories/DirectorRepository";
import DepartmentRepository from "@repositories/DepartmentRepository";
import ProjectTeamRepository from "@repositories/ProjectTeamRepository";
import TeamMemberRepository from "@repositories/TeamMemberRepository";
import SettingRepository from "@repositories/SettingRepository";

export interface IRequest extends Hapi.Request {
  auth: any;
  params: { client_id: string };
}

interface BrandBaseRequestInterface {
  params: {
    id: string;
    client_id: string;
  };
}

interface IDirectorRequest extends IRequest {
  payload: {
    name: string,
  };
}

interface IProjectTeamRequest extends IRequest {
  payload: {
    department_id: string,
    name: string
  };
}

interface ITeamMemberRequest extends IRequest {
  payload: {
    project_team_id: string,
    name: string
  };
}

interface IDepartmentRequest extends IRequest {
  payload: {
    name: string,
    director_id: string,
    manager_id: string
  };
}

interface PaginationRequestInterface extends IRequest {
  query: {
    page: string,
    limit: string,
  };
}

export default class TeamMemberController {
  private directorRepository: DirectorRepository;
  private departmentRepository: DepartmentRepository;
  private projectTeamRepository: ProjectTeamRepository;
  private teamMemberRepository: TeamMemberRepository;

  constructor() {
    this.directorRepository = new DirectorRepository();
    this.departmentRepository = new DepartmentRepository();
    this.projectTeamRepository = new ProjectTeamRepository();
    this.teamMemberRepository = new TeamMemberRepository();
    this.createDirector = this.createDirector.bind(this);
    this.createDepartment = this.createDepartment.bind(this);
    this.createProjectTeam = this.createProjectTeam.bind(this);
    this.createTeamMember = this.createTeamMember.bind(this);
    this.paginationTeamMember = this.paginationTeamMember.bind(this);
  }

  public async createDirector(request: IDirectorRequest, h: Hapi.ResponseToolkit) {
    try {
      const { name } = request.payload;
      const { client_id } = request.params;
      if (await this.directorRepository.findOne({ client_id: client_id, name: name, deleted: false }, {}, {})) {
        throw `Director Name ${name} is already exist`;
      }
      const createdDoc = await this.directorRepository.insertOne({ name: name, client_id: client_id });
      return h.response(createdDoc).code(Httpcode.Success.CREATED);
    } catch (error) {
      if (_.isString(error)) {
        throw Error.badRequest(error);
      }
      Logger.error('createDirector ', error);
      throw Error.unknown('Can not create item');
    }
  }

  public async createDepartment(request: IDepartmentRequest, h: Hapi.ResponseToolkit) {
    try {
      const { name, director_id, manager_id } = request.payload;
      const { client_id } = request.params;
      if (await this.departmentRepository.findOne({ client_id: client_id, name: name, deleted: false }, {}, {})) {
        throw `Department Name ${name} is already exist`;
      }
      const createdDoc = await this.departmentRepository.insertOne({ client_id: client_id, name: name, director_id: director_id, manager_id: manager_id });
      return h.response(createdDoc).code(Httpcode.Success.CREATED);
    } catch (error) {
      if (_.isString(error)) {
        throw Error.badRequest(error);
      }
      Logger.error('createDepartment ', error);
      throw Error.unknown('Can not create item');
    }
  }

  public async createProjectTeam(request: IProjectTeamRequest, h: Hapi.ResponseToolkit) {
    try {
      const { name, department_id } = request.payload;
      const { client_id } = request.params;
      if (await this.projectTeamRepository.findOne({ client_id: client_id, name: name, deleted: false }, {}, {})) {
        throw `Project Team Name ${name} is already exist`;
      }
      const createdDoc = await this.projectTeamRepository.insertOne({ client_id: client_id, name: name, department_id: department_id });
      return h.response(createdDoc).code(Httpcode.Success.CREATED);
    } catch (error) {
      if (_.isString(error)) {
        throw Error.badRequest(error);
      }
      Logger.error('createProjectTeam ', error);
      throw Error.unknown('Can not create item');
    }
  }

  public async createTeamMember(request: ITeamMemberRequest, h: Hapi.ResponseToolkit) {
    try {
      const { name, project_team_id } = request.payload;
      const { client_id } = request.params;
      if (await this.teamMemberRepository.findOne({ client_id: client_id, name: name, deleted: false, project_team_id: project_team_id }, {}, {})) {
        throw `Project Team Name ${name} is already exist`;
      }
      const createdDoc = await this.teamMemberRepository.insertOne({ client_id: client_id, name: name, project_team_id: project_team_id });
      return h.response(createdDoc).code(Httpcode.Success.CREATED);
    } catch (error) {
      if (_.isString(error)) {
        throw Error.badRequest(error);
      }
      Logger.error('createTeamMember ', error);
      throw Error.unknown('Can not create item');
    }
  }

  public async paginationTeamMember(request: PaginationRequestInterface, h: Hapi.ResponseToolkit) {
    try {
      const { client_id } = request.params;
      const setting = await new SettingRepository().getOrCreateSettings();
      let limit: number = setting && setting.max_member_can_get_once ? setting.max_member_can_get_once : request.query.limit ? _.parseInt(request.query.limit) : 1500;
      if (limit > 1500) {
        limit = 1500;
      }
      const response: any = {
        items: []
      };
      response.items = await this.teamMemberRepository.leanFind({ client_id: client_id, deleted: false }, {}, {});
      return h.response(response).code(Httpcode.Success.OK);
    } catch (err) {
      Logger.error(err);
      throw Error.unknown(err);
    }
  }

}
