import BaseRepository from "./base/BaseRepository";
import DirectorModel from "@models/DirectorModel";
import { IDirector } from "@models/interfaces/DirectorEntityInterface";

export default class DirectorRepository extends BaseRepository<IDirector> {
  constructor() {
    super(DirectorModel as any);
  }
}
