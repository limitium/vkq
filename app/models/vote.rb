class Vote
  include Mongoid::Document
  field :rated, :type => Integer
  field :voter, :type => Integer
  field :value, :type => Integer
  field :paid, :type => Boolean
  field :message, :type => String
  field :created_at, :type => Integer

  field :voter_data, :type => Hash

#  index :rated
#  index :voter
#
#
#  referenced_in :voter, :class_name => 'Queen', :inverse_of => :votes, :index => true
#  referenced_in :rated, :class_name => 'Queen', :inverse_of => :rates, :index => true

  before_create :set_created_at

  protected
  def set_created_at
    self.created_at= Time.now.to_i
  end
end
