import { GamificationRecords } from './collection';
import { addCreatedAtTimestamp, addUpdatedAtTimestamp } from '../helpers';

GamificationRecords.before.insert(addCreatedAtTimestamp);
GamificationRecords.before.update(addUpdatedAtTimestamp);