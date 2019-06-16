import syncWitAiTask from './syncWitAi';
import Logger from '../logger';

const startUpTask = async () => {
  try {
    await Promise.all([
      syncWitAiTask(),
    ]);
  } catch (error) {
    Logger.error(error);
  }
  Logger.info('Finished all start up tasks');
};

export default startUpTask;
