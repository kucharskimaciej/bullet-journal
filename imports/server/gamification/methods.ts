import {GamificationRecords, IGamificationRecord} from '../../collections/gamification/collection';
import {notify} from './gamification';
import {registerMethods, Methods, authenticate} from "../../lib/method_utils";
import {createRecord} from './subjects';

@registerMethods({
    collection: GamificationRecords,
    methods: ['createRecord']
})
class GamificationRecordsMethods extends Methods<IGamificationRecord>  {
    @authenticate
    createRecord(key: string) {
        notify(createRecord(this.userId, key));
    }
}
