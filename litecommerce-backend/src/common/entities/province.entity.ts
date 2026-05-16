import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Entity tỉnh/thành phố
 * Lưu trữ danh sách các tỉnh thành phố của Việt Nam
 */
@Entity('Provinces')
export class Province {
  /**
   * Tên tỉnh/thành phố (Primary Key)
   * Ví dụ: 'Hà Nội', 'Hồ Chí Minh'
   */
  @PrimaryColumn({ type: 'varchar', length: 255 })
  provinceName: string;
}
