class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :password
      t.string :username
      t.timestamps
    end
  end
end
