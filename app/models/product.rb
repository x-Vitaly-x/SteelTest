require 'csv'

class Product < ApplicationRecord
  belongs_to :user # user who imported this product

  validates_presence_of :part_number, :branch_id, :part_price, :short_desc
  validates_uniqueness_of :part_number

  def self.import_csv(csv_file, user_id, delete_old_entries = false)
    Product.transaction do
      Product.destroy_all if delete_old_entries
      csv = CSV.parse(csv_file.read, headers: true, col_sep: '|')
      csv.each do |row|
        data = {user_id: user_id}
        row.to_hash.each_pair do |k, v|
          data.merge!({k.downcase => v})
        end
        Product.create_with(data).find_or_create_by(part_number: data['part_number'])
      end
    end
  end
end
