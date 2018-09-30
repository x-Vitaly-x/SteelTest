class Api::V1::Products::CsvUploadsController < ApplicationController
  before_action :authenticate_user!

  def create
    Product.import_csv(params['csv_upload'], current_user.id, params['delete_old_entries'] == '1')
    render json: {}, status: 200
  rescue
    render json: {error: 'Failed to parse csv!'}, status: 500
  end
end
