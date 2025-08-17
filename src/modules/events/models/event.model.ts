import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IEvent } from "src/interfaces/IEvent.interface";
import { CreateEventDto } from "../dto/createEvent.dto";
import { Col } from "sequelize/types/utils";

@Table({ tableName: "events", timestamps: true })
export class EventModel extends Model<IEvent, CreateEventDto> {
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
    defaultValue: 0,
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
    allowNull: false,
    defaultValue: false,
  })
  allowed: boolean;
}
