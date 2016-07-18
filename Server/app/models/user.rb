require 'secure_random'

class User < ApplicationRecord

  include Auth # app/models/concerns/auth.rb
  include UpdateCaches # app/models/concerns/update_caches.rb

  validates :name,            presence: true
  def name=(val)
    super(val.blank? ? nil : val)
  end



end
