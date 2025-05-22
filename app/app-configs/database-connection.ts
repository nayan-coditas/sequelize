import { Sequelize } from "sequelize";
const { DB_USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_DIALECT } =
  process.env;

export const sequelizeInstanceCreation = ({
  database,
  username,
  password,
  host,
  port,
}: {
  database: string;
  username: string;
  password: string;
  host: string;
  port: string;
}) => {
  return new Sequelize(
    database as string,
    username as string,
    password as string,
    {
      host: host,
      dialect: (DB_DIALECT as any) || "postgres",
      port: parseInt(port!),
      pool: {
        max: 20,
        min: 0,
        acquire: 60000,
      },
    }
  );
};

console.log("DB_USER_NAME", DB_USER_NAME);
console.log("DB_PASSWORD", DB_PASSWORD);
console.log("DB_NAME", DB_NAME);
console.log("DB_HOST", DB_HOST);
console.log("DB_PORT", DB_PORT);
console.log("DB_DIALECT", DB_DIALECT);

const sequelize = sequelizeInstanceCreation({
  database: DB_NAME!,
  username: DB_USER_NAME!,
  password: DB_PASSWORD!,
  host: DB_HOST!,
  port: DB_PORT!,
});

export const databaseConnection = async () => {
  await sequelize.authenticate();
  if (sequelize) {
    console.log("Database Connected Successfully");
  } else {
    console.log("Something Went Wrong With Database Connection.");
  }
};

export { sequelize };
