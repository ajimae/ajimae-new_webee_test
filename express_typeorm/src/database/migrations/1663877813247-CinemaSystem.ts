import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories
   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.
   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.
   ## User Stories
   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out
   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms
   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat
   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Customer',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'mobile', type: 'integer' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'Order',
        columns: [
          {
            name: 'orderId',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'scheduleId', type: 'integer'},
          { name: 'orderAdjustedPrice', type: 'double'},
          { name: 'orderDate', type: 'timestamp'},
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'order_seat',
        columns: [
          {
            name: 'orderId', type: 'integer'
          },
          { name: 'scheduleId', type: 'integer' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'schedule',
        columns: [
          {
            name: 'scheduleId',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movieId', type: 'integer' },
          { name: 'hallId', type: 'integer' },
          { name: 'schedulePrice', type: 'double' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'Movie',
        columns: [
          {
            name: 'movieId',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'Hall',
        columns: [
          {
            name: 'hallId',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'seatCounts', type: 'integer' },
          { name: 'hallName', type: 'varchar' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'Seat',
        columns: [
          {
            name: 'seatId',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'hallId', type: 'integer' },
          { name: 'seatRow', type: 'integer' },
          { name: 'seatColumn', type: 'integer' },
          { name: 'active', type: 'boolean' },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'Order',
      new TableForeignKey({
        columnNames: ['customerId'],
        referencedColumnNames: ['customerId'],
        referencedTableName: 'Customer',
      }),
    );
    await queryRunner.createForeignKey(
      'Order',
      new TableForeignKey({
        columnNames: ['scheduleId'],
        referencedColumnNames: ['scheduleId'],
        referencedTableName: 'Schedule',
      }),
    );
    await queryRunner.createForeignKey(
      'Schedule',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['movieId'],
        referencedTableName: 'Movie',
      }),
    );
    await queryRunner.createForeignKey(
      'Schedule',
      new TableForeignKey({
        columnNames: ['hallId'],
        referencedColumnNames: ['hallId'],
        referencedTableName: 'Hall',
      }),
    );
    await queryRunner.createForeignKey(
      'Seat',
      new TableForeignKey({
        columnNames: ['hallId'],
        referencedColumnNames: ['hallId'],
        referencedTableName: 'Hall',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}