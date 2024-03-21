import DbConnection from '@infra/db/mongodb/helpers/db-connection';
import setupApp from '@main/config/app';
import env from '@main/config/env';
import 'module-alias/register';

DbConnection.connect(env.mongodbUrl)
  .then(async () => {
    const app = setupApp();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${env.port}`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
