import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed, BreedDocument } from './schemas/breed.schema';

@Injectable()
export class BreedsService {
  constructor(
    @InjectModel(Breed.name) private breedModel: Model<BreedDocument>,
  ) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    return new this.breedModel(createBreedDto).save();
  }

  findAll() {
    return this.breedModel.find();
  }

  findOne(name: string) {
    return this.breedModel.findOne({name});
  }

  update(name: String, updateBreedDto: UpdateBreedDto) {
    return this.breedModel.updateOne({name}, {$set:{...updateBreedDto}})
  }

  remove(id: number) {
    // return `This action removes a #${id} breed`;
    return this.breedModel.deleteOne({id})
  }
}
