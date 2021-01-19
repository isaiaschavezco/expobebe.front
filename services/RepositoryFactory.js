import UserRepository from './users'
import ProductRepository from './products'
import EventRepository from './events'
import BookRepository from './books'
import TradeMarkRepository from './trademarks'
import UtilityRepository from './utilities'
import CardsRepository from './cards'
import VideosRepository from './videos'
import ChatsRepository from './chats'

export default http => ({
  user: UserRepository(http),
  product: ProductRepository(http),
  event: EventRepository(http),
  book: BookRepository(http),
  trademark: TradeMarkRepository(http),
  utilities: UtilityRepository(http),
  card: CardsRepository(http),
  video: VideosRepository(http),
  chat: ChatsRepository(http)
})
