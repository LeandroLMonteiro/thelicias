import { DadosConf } from '../../src/entities/dadosConf';
import { DadosConfItem } from '../../src/entities/dadosConfItem';
import { testDataSource } from '../config/database.config';

export const GetDadosConfFixtureFake = async () => {
    const dadosConfRepository = testDataSource.getRepository(DadosConf);
    const dadosConfItemRepository = testDataSource.getRepository(DadosConfItem);
    const dadosConf = dadosConfRepository.create({
        tipo: 'HeaderTeste',
        itens: [
            dadosConfItemRepository.create({ 
                descricao: 'Item 1',
                manuseioEspecial: 'M1',
            }),
            dadosConfItemRepository.create({ 
                descricao: 'Item 2', 
                manuseioEspecial: 'M1|M2' 
            }),
            dadosConfItemRepository.create({ 
                descricao: 'Item 3'
            }),
        ],
    });
    return await dadosConfRepository.save(dadosConf);
};
export const GetFirstDadosConfFixture = async () => {
    const dadosConfRepository = testDataSource.getRepository(DadosConf);
    return await dadosConfRepository.findOneBy({ id: 1 });
};
export const GetFirstDadosConfItemFixture = async () => {
    const dadosConfItemRepository = testDataSource.getRepository(DadosConfItem);
    return await dadosConfItemRepository.findOneBy({ id: 1 });
};