import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IEvent } from "src/interfaces/IEvent.interface";
import { CreateEventDto } from "../dto/createEvent.dto";

@Table({ tableName: "events", timestamps: true })
export class EventModel extends Model<IEvent, CreateEventDto> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare eventUid: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare description: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    declare category: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare date: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare bannerurl: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare ownerId: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    declare allowed: boolean;
}
