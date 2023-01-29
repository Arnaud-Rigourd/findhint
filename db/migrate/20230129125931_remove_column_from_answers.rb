class RemoveColumnFromAnswers < ActiveRecord::Migration[7.0]
  def change
    remove_column :answers, :content, :text
    add_column :answers, :content, :string
  end
end
