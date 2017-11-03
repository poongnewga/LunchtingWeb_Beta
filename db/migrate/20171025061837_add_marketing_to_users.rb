class AddMarketingToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :marketing, :boolean
  end
end
