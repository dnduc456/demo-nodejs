import BaseRepository from "./base/BaseRepository";
import ProjectTeamModel from "@models/ProjectTeamModel";
import { IProjectTeam } from "@models/interfaces/ProjectTeamEntityInterface";

export default class ProjectTeamRepository extends BaseRepository<IProjectTeam> {
  constructor() {
    super(ProjectTeamModel as any);
  }
}
