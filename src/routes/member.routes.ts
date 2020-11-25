import TeamMemberController from "@controllers/TeamMemberController";

const Joi = require('joi');
import MESSAGES from '@utils/messages';
import {Sort} from "@enum/sort";
const JwtHeader =  Joi.object({
  authorization: Joi.string().required().description('JWT')
}).unknown();

const ErrorSchema = Joi.object({
  statusCode: Joi.string().description('HTTP status code'),
  error: Joi.string(),
  message: Joi.string().description('Error message'),
  errors: Joi.array().description("Error code")
}).label('Error');


const ParamClientReqSchema = Joi.object().keys({
  client_id: Joi.string().guid().required().error(() => 'Invalid client id').description('Client Id')
});

const DirectorReqSchema = Joi.object({
  name: Joi.string().description('Director Name').required(),
}).label('Director Create Requests');

const DepartmentReqSchema = Joi.object({
  name: Joi.string().description('Name').required(),
  director_id: Joi.string().description('director_id').required(),
  manager_id: Joi.string().description('manager_id').optional(),
}).label('Director Create Requests');

const ProjectTeamReqSchema = Joi.object({
  name: Joi.string().description('Name').required(),
  department_id: Joi.string().description('department_id').required(),
}).label('Director Create Requests');

const TeamMemberReqSchema = Joi.object({
  name: Joi.string().description('Name').required(),
  project_team_id: Joi.string().description('project_team_id').required(),
}).label('Director Create Requests');

const PaginationReqSchema = Joi.object({
  limit: Joi.number().optional().description('Limit')
}).label('Pagination Requests');

const PaginationSellerEnforcementValidateSchema = Joi.object().keys({
  total: Joi.number().description('Total').default(0),
  page_count: Joi.number().description('Page Count').default(0),
  page_size: Joi.number().description('Page Size').default(0),
  page_current: Joi.number().description('Page Current').default(0),
  items: Joi.array().items().description('Item')
}).label('Pagination Brand');

export const CreateRes = {
  '201': {
    description: MESSAGES.SUCCESS,
    schema: Joi.object().keys({
      id: Joi.string().required().description('Id'),
    })
  },
  '400': {
    description: MESSAGES.BAD_REQUEST,
    schema: ErrorSchema
  }
};

const PaginationRes = {
  '201': {
    description: MESSAGES.SUCCESS,
    schema: PaginationSellerEnforcementValidateSchema
  },
  '400': {
    description: MESSAGES.BAD_REQUEST,
    schema: ErrorSchema
  }
};

export default (function () {
  const teamMemberController = new TeamMemberController();
  const versionV1 = '/v1/';
  return [
    {
      method: "POST",
      path: `${versionV1}clients/{client_id}/directors`,
      options: {
        auth: false,
        handler: teamMemberController.createDirector,
        tags: ["api", "director"],
        description: "Create a new director",
        validate: {
          params: ParamClientReqSchema,
          payload: DirectorReqSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CreateRes
          }
        }
      }
    },
    {
      method: "POST",
      path: `${versionV1}clients/{client_id}/departments`,
      options: {
        auth: false,
        handler: teamMemberController.createDepartment,
        tags: ["api", "departments"],
        description: "Create a new department",
        validate: {
          params: ParamClientReqSchema,
          payload: DepartmentReqSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CreateRes
          }
        }
      }
    },
    {
      method: "POST",
      path: `${versionV1}clients/{client_id}/project-teams`,
      options: {
        auth: false,
        handler: teamMemberController.createProjectTeam,
        tags: ["api", "project teams"],
        description: "Create a new project team",
        validate: {
          params: ParamClientReqSchema,
          payload: ProjectTeamReqSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CreateRes
          }
        }
      }
    },
    {
      method: "POST",
      path: `${versionV1}clients/{client_id}/team-members`,
      options: {
        auth: false,
        handler: teamMemberController.createTeamMember,
        tags: ["api", "team members"],
        description: "Create a new team member",
        validate: {
          params: ParamClientReqSchema,
          payload: TeamMemberReqSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: CreateRes
          }
        }
      }
    },
    {
      method: "GET",
      path: `${versionV1}clients/{client_id}/team-members`,
      options: {
        auth: false,
        handler: teamMemberController.paginationTeamMember,
        tags: ["api", "team members"],
        description: "Pagination team members.",
        validate: {
          params: ParamClientReqSchema,
          query: PaginationReqSchema
        },
        plugins: {
          'hapi-swagger': {
            responses: PaginationRes
          }
        }
      }
    },
    ];
})();


