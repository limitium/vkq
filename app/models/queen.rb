class Queen
  include Mongoid::Document
  identity :type => Integer

  field :first_name
  field :last_name
  field :nickname
  field :domain
  field :sex, :type => Boolean
  field :bdate
  field :city
  field :country
  field :photo
  field :photo_rec
  field :photo_medium_rec
  field :photo_big
  field :rate, :type => Integer
  field :mobile_phone
  field :home_phone
  field :education

  field :salt


  key :_id
  index :_id, :unique => true

  def self.authenticate_with_salt(id, cookie_salt)
    if !id.nil?
      user = find(id)
      (user && user.salt == cookie_salt) ? user : nil
    end
  end
end
