import { Injectable } from '@angular/core' 
import { Chat } from '../common/models/chat.model';

let date = new Date(),
  day = date.getDate(),
  month = date.getMonth(),
  year = date.getFullYear(),
  hour = date.getHours(),
  minute = date.getMinutes(); 
  
let chats = [
  new Chat(
    'img/profile/ashley.jpg',
    'Ashley Ahlberg',
    'Online',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day - 2, hour, minute),
    false
  ),
  new Chat(
    'img/profile/bruno.jpg',
    'Bruno Vespa',
    'Do not disturb',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day - 2, hour, minute),
    false
  ),
  new Chat(
    'img/profile/julia.jpg',
    'Julia Aniston',
    'Away',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day - 2, hour, minute),
    false
  ),
  new Chat(
    'img/profile/adam.jpg',
    'Adam Sandler',
    'Online',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day - 2, hour, minute),
    false
  ),
  new Chat(
    'img/profile/tereza.jpg',
    'Tereza Stiles',
    'Offline',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day - 2, hour, minute),
    false
  ),
  new Chat(
    'img/profile/michael.jpg',
    'Michael Blair',
    'Online',
    'Great, then I\'ll definitely buy this theme. Thanks!',
    new Date(year, month, day - 2, hour, minute),
    false
  )
]

let talks = [
  new Chat(
    'img/profile/ashley.jpg',
    'Ashley Ahlberg',
    'Online',
    'Hi, I\'m looking for admin template with angular material 2 design.  What do you think about Gradus Admin Template?',
    new Date(year, month, day - 2, hour, minute + 3),
    false
  ),
  new Chat(
    'img/users/user.jpg',
    'Emilio Verdines',
    'Online',
    'Hi, Gradus is a fully compatible with angular material 2, responsive, organized folder structure, clean & customizable code, easy to use and much more...',
    new Date(year, month, day - 2, hour, minute + 2),
    true
  )
]

@Injectable()
export class ChatService {

  public getChats(): Array<Chat> {
    return chats;
  }

  public getTalk(): Array<Chat> {
    return talks;
  }

}

