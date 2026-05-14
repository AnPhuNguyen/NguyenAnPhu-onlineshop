import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiQuery, ApiParam } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ADMIN_PRODUCT_ATTRIBUTES_RESPONSES } from '../../common/constants/api-response';
import { AdminProductAttributesService } from './admin-product-attributes.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';

@ApiTags('admin-product-attributes')
@ApiBearerAuth('JWT-auth')
@Controller('admin/product-attributes')
@Roles('employee', 'admin')
export class AdminProductAttributesController {
  constructor(
    private readonly adminProductAttributesService: AdminProductAttributesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách thuộc tính (admin)' })
  @ApiResponse(ADMIN_PRODUCT_ATTRIBUTES_RESPONSES.GET_ATTRIBUTES_SUCCESS)
  async listAll() {
    return this.adminProductAttributesService.listAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Thêm thuộc tính cho sản phẩm (admin)' })
  @ApiResponse(ADMIN_PRODUCT_ATTRIBUTES_RESPONSES.CREATE_ATTRIBUTE_SUCCESS)
  async create(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateProductAttributeDto,
  ) {
    return this.adminProductAttributesService.create(dto);
  }

  @Put(':productId/:attributeId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật thuộc tính sản phẩm (admin)' })
  @ApiResponse(ADMIN_PRODUCT_ATTRIBUTES_RESPONSES.UPDATE_ATTRIBUTE_SUCCESS)
  @ApiParam({ name: 'productId', description: 'ID sản phẩm' })
  @ApiParam({ name: 'attributeId', description: 'ID thuộc tính' })
  async update(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: UpdateProductAttributeDto,
  ) {
    return this.adminProductAttributesService.update(productId, attributeId, dto);
  }

  @Delete(':productId/:attributeId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa thuộc tính sản phẩm (admin)' })
  @ApiResponse(ADMIN_PRODUCT_ATTRIBUTES_RESPONSES.DELETE_ATTRIBUTE_SUCCESS)
  async remove(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('attributeId', ParseIntPipe) attributeId: number,
  ) {
    return this.adminProductAttributesService.delete(productId, attributeId);
  }
}
