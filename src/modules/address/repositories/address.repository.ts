/* eslint-disable prettier/prettier */
import { UpdateAddressDto } from '../dto/updateAddress.dto';
import { Address } from '../entities/address.entity';

export abstract class AddressRepository {
  abstract findOne(id: string, userId: string): Promise<Address> | Address;
  abstract update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> | Address;
}
