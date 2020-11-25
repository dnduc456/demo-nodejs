import BaseRepository from "./base/BaseRepository";
import TeamMemberModel from "@models/TeamMemberModel";
import { ITeamMember } from "@models/interfaces/TeamMemberEntityInterface";

export default class TeamMemberRepository extends BaseRepository<ITeamMember> {
  constructor() {
    super(TeamMemberModel as any);
  }
}
