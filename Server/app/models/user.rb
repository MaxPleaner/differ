require 'secure_random'

class User < ApplicationRecord
  validates :password_digest, presence: true
  validates :name,            presence: true
  has_secure_password

  def name=(val)
    super(val.blank? ? nil : val)
  end

  def login(password)
    update(session_token: SecureRandom.urlsafe_base64)
  end

  def logout
    update(session_token: nil)    
  end

end
