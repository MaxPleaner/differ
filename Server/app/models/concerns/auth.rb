module Auth
  extend ActiveRecord::Concern

  included do
    validates :password_digest, presence: true
    validates :name,            presence: true
    has_secure_password
  end

  def login(password)
    update(session_token: SecureRandom.urlsafe_base64)
  end

  def logout
    update(session_token: nil)    
  end

end
