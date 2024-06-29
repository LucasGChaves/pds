import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from './knexfile';

const config = knexConfig.development;

const knex = Knex(config);

Model.knex(knex);

export default knex;