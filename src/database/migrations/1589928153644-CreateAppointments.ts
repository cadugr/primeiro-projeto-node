import { MigrationInterface, QueryRunner, Table } from 'typeorm';
/**
 * Só podemos alterar uma migration existente se ela só existir na nossa máquina.
 * Se existir em um controle de versão (ex: git), então não podemos alterar a migration
 * e sim criar uma nova para corrigir o que queremos
 */
export default class CreateAppointments1589928153644
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // Necessário no postgres pois o mesmo possui essa função default para gerar uuid
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // só no postgres...para outros bancos usar timestamp
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
