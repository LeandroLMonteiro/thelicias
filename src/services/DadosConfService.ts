import { AppDataSource } from "../database/data-source";
import { DadosConf } from "../entities/DadosConf";
import { DadosConfItem } from "../entities/DadosConfItem";
import { CreateDadosConfDto } from "../dtos/CreateDadosConfDto";
import { UpdateDadosConfDto } from "../dtos/UpdateDadosConfDto";
import { CreateDadosConfItemDto } from "../dtos/CreateDadosConfItemDto";
import { UpdateDadosConfItemDto } from "../dtos/UpdateDadosConfItemDto";

const dadosConfRepository = AppDataSource.getRepository(DadosConf);
const dadosConfItemRepository = AppDataSource.getRepository(DadosConfItem);

export class DadosConfService {
    async findAll(): Promise<DadosConf[]> {
        return dadosConfRepository.find({ relations: ['itens'] });
    }

    async findOne(id: number): Promise<DadosConf | null> {
        return dadosConfRepository.findOne({
            where: { id },
            relations: ['itens'],
        });
    }

    async create(createDadosConfDto: CreateDadosConfDto): Promise<DadosConf> {
        const dadosConf = dadosConfRepository.create({
            tipo: createDadosConfDto.tipo,
            itens: createDadosConfDto.itens.map(itemDto => dadosConfItemRepository.create(itemDto)),
        });
        return await dadosConfRepository.save(dadosConf);
    }

    async update(id: number, updateDadosConfDto: UpdateDadosConfDto): Promise<DadosConf | null> {
        const dadosConf = await dadosConfRepository.findOneBy({ id });
        if (!dadosConf) {
            return null;
        }
        dadosConfRepository.merge(dadosConf, updateDadosConfDto);
        return dadosConfRepository.save(dadosConf);
    }

    async delete(id: number): Promise<boolean> {
        const result = await dadosConfRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }

    // Métodos para DadosConfItem

    async findItensByDadosConfId(idDadosConf: number): Promise<DadosConfItem[]> {
        return dadosConfItemRepository.find({ where: { idDadosConf: idDadosConf } });
    }

    async findOneItem(idDadosConf: number, itemId: number): Promise<DadosConfItem | null> {
        return dadosConfItemRepository.findOne({ where: { idDadosConf: idDadosConf, id: itemId } });
    }

    async createItem(idDadosConf: number, createDadosConfItemDto: CreateDadosConfItemDto): Promise<DadosConfItem | null> {
        const dadosConf = await dadosConfRepository.findOneBy({ id: idDadosConf });
        if (!dadosConf) {
            return null;
        }
        const newItem = dadosConfItemRepository.create({ ...createDadosConfItemDto, idDadosConf });
        return dadosConfItemRepository.save(newItem);
    }

    async updateItem(idDadosConf: number, itemId: number, updateDadosConfItemDto: UpdateDadosConfItemDto): Promise<DadosConfItem | null> {
        const item = await dadosConfItemRepository.findOne({ where: { idDadosConf: idDadosConf, id: itemId } });
        if (!item) {
            return null;
        }
        dadosConfItemRepository.merge(item, updateDadosConfItemDto);
        return dadosConfItemRepository.save(item);
    }

    async deleteItem(idDadosConf: number, itemId: number): Promise<boolean> {
        const result = await dadosConfItemRepository.delete({ idDadosConf: idDadosConf, id: itemId });
        return (result.affected ?? 0) > 0;
    }
}

const dadosConfService = new DadosConfService();
export default dadosConfService;