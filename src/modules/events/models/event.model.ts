import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IEvent } from "src/interfaces/IEvent.interface";

type EventCreationAttrs = Omit<IEvent, "eventUid">;

@Table({ tableName: "events", timestamps: true })
export class EventModel extends Model<IEvent, EventCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  eventUid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bannerurl: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  allowed: boolean;
}
