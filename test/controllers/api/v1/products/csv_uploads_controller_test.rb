require 'test_helper'

class Api::V1::Products::CsvUploadsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'uploading a csv file will create new products' do
    @user = users(:sample_user_1)

    assert_difference('Product.count', 8) do # file has 8 unique entries, not 9
      Product.import_csv(File.new('data.csv'), @user.id)
    end
  end

  test 'uploading file with delete flag will delete old entries' do
    @user = users(:sample_user_1)
    Product.import_csv(File.new('data.csv'), @user.id, true)
    assert_equal Product.count, 8
  end
end
