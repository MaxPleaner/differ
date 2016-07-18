class UpdateCache < ApplicationRecord
  belongs_to :user
  
  def is_delete=(val)
    val.nil? ? false : true
  end
  
  def record
    record_type.camelize.constantize.find_by(id: record_id)
  end
  
  def self.of_user_of_type(user, type)
    where(user_id: user.id, record_type:  type)
  end
  
end
