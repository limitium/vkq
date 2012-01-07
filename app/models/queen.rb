class Queen
  include Mongoid::Document
  identity :type => Integer

  field :first_name, :default => ""
  field :last_name, :default => ""
  field :nickname, :default => ""
  field :domain, :default => ""
  field :sex, :type => Integer
  field :bdate
  field :city, :type => Integer
  field :city_name
  field :country, :type => Integer
  field :country_name
  field :photo, :default => ""
  field :photo_rec, :default => ""
  field :photo_medium_rec, :default => ""
  field :photo_big, :default => ""
  field :rate, :type => Integer
  field :mobile_phone
  field :home_phone
  field :faculty, :type => Integer
  field :faculty_name
  field :university, :type => Integer
  field :university_name
  field :graduation, :type => Integer

  field :rating, :type => Integer, :default => 0
  field :salt
  field :updated_at, :type => Integer
  field :created_at, :type => Integer

  field :last_vote, :type => Hash

  attr_accessible :_id, :first_name, :last_name, :nickname, :domain, :sex, :bdate, :city, :city_name, :country, :country_name, :photo, :photo_rec, :photo_medium_rec, :photo_big, :rate, :mobile_phone, :home_phone, :faculty, :faculty_name, :university, :university_name, :graduation
  key :_id




  references_many :votes, :class_name => 'Vote', :inverse_of => :voter, :index => true
  references_many :rates, :class_name => 'Vote', :inverse_of => :rated, :index => true


  def self.authenticate_with_salt(id, cookie_salt)
    if !id.nil?
      user = find(id)
      (user && user.salt == cookie_salt) ? user : nil
    end
  end

  before_create :set_created_at
  before_update :set_updated_at

  def force
    self.rating > 0 ? (Math.log10(self.rating.fdiv(4))+1.2).round : 1
  end

  def rates_page(page)
    self.rates.order_by(:created_at=>:desc).page(page).per(7)
  end

  def position
    Queen.count(:conditions => {:rating.gte => self.rating})
  end

  def pluses
    Vote.count :conditions => {:rated_id => self._id, :value.gt => 0}
  end

  def total
    Vote.count :conditions => {:rated_id => self._id}
  end

  def pluses_self
    Vote.count :conditions => {:voter_id => self._id, :value.gt => 0}
  end

  def total_self
    Vote.count :conditions => {:voter_id => self._id}
  end

  protected
  def set_created_at
    self.created_at = Time.now.to_i
  end

  def set_updated_at
    self.updated_at = Time.now.to_i
  end

end
