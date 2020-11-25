import BaseRepository from "./base/BaseRepository";
import SettingModel from "@models/SettingModel";
import { ISetting } from "@models/interfaces/SettingEntityInterface";
import SettingDB from "@constants/settingdb";
import _ from 'lodash';

export default class SettingRepository extends BaseRepository<ISetting> {
  constructor () {
    super(SettingModel);
  }

  async getOrCreateSettings () {
    const defaultData = {
      _id: SettingDB.global_setting_id,
      max_member_can_get_once: SettingDB.max_member_can_get_once,
    };
    const conditionFindSetting = { _id: SettingDB.global_setting_id };
    let result = await this.findOne(conditionFindSetting, {}, {});
    if (!result) {
      await this.insertOne(defaultData);
      return defaultData;
    }
    return result;
  }
}
