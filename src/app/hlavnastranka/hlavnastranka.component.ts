import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Igendereize, IZippo, UserService } from '../services/user.service';
import { User } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hlavnastranka',
  templateUrl: './hlavnastranka.component.html',
  styleUrls: ['./hlavnastranka.component.css'],
})
export class HlavnastrankaComponent implements OnInit {
  users: User[] = [];
  loggedInUser = this.userservice.loggedInUser;
  loginTime: Date | undefined;
  clickCounter = 0;
  showndetailsUser: User | undefined;
  selectedUser: User | undefined;
  showndetails = false;
  genderData?: Igendereize;
  ZippoData?: IZippo;
  message = '';
  chatHistory: { [key: string]: any[] } = {};
  letterCount: number = 0;
  loginCas: Date | undefined
  ukazanyChat: boolean = true;
  divContent: string = '';
  showMoreDetails: boolean = false;


  @ViewChild('messageTextArea') messageTextArea!: ElementRef;

  incrementCounter() {
    this.clickCounter++;
  }

  constructor(
    private userservice: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userservice.users.subscribe((user) => {
      this.users.push(user);

    })
    
    this.loginCas = new Date;

    document.addEventListener('click', this.incrementCounter.bind(this));

    // Filter users based on chat history
    this.users = this.users.filter((user) => {
      const userId = user.id;
      return (
        userId &&
        this.chatHistory[userId] &&
        this.chatHistory[userId].length > 0
      );
    });
  }


  clearDivContent() {
    this.divContent = '';
  }


  logOut() {
    this.router.navigate(['/info'])
    this.userservice.loggedInUser = {} as User;

  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.showndetailsUser = user;
  }

  showDetails(user: User) {
    if (this.selectedUser === user) {
      this.showndetails = !this.showndetails;
    } else {
      this.selectedUser = user;
      this.showndetails = true;
    }
  }

  clearSelectedUser() {
    this.selectedUser = undefined;
    this.showndetails = false;
  }

  Genderize() {
    this.http
      .get(`https://api.genderize.io?name=${this.selectedUser?.firstName}`)
      .subscribe((data: any) => {
        this.genderData = data;
        console.log(this.genderData?.gender);
      });
  }

  Zippovanie() {
    this.http
      .get(
        `https://api.zippopotam.us/us/${this.selectedUser?.address.postalCode}`
      )
      .subscribe((data: any) => {
        this.ZippoData = data;
        console.log(this.ZippoData?.places?.state);
      });
  }

  startChatWithUser(user: any) {
    this.selectedUser = user;
    this.ukazanyChat = true;
    const userId = user.id;
    if (userId && !this.chatHistory[userId]) {
      this.chatHistory[userId] = []; // Create a chat history array for the user if it doesn't exist
    }
  }
  setLoginTime() {
    const loginTime = new Date(); // Get the login time
    localStorage.setItem('loginTime', loginTime.toISOString());
  }
  getChatSessions(): any[][] {
    return Object.entries(this.chatHistory).map(
      ([userId, chatSession]) => chatSession
    );
  }

  calculateLetterCount(): number {
    let count = 0;
    for (const userId of Object.keys(this.chatHistory)) {
      for (const session of this.chatHistory[userId]) {
        for (const chat of session) {
          count += chat.message.length;
        }
      }
    }
    return count;
  }
  onInput() {
    const inputTextArea = this.messageTextArea
      .nativeElement as HTMLTextAreaElement;
    this.letterCount = inputTextArea.value.length; // Update the letter count
  }


  showMore(){
    this.showMoreDetails = !this.showMoreDetails 
  }

  endChat() {
   this.ukazanyChat = false
  }
  


  sendMessage() {
    const payload = { text: this.message }; // Update the message payload structure
    const sentTimestamp = new Date(); // Get the current timestamp

    const userId = this.selectedUser && this.selectedUser.id;
    if (userId) {
      this.http
        .post('https://httpbin.org/post', payload)
        .subscribe((response: any) => {
          const len = response.json.text.length;
          const ipAddress = response.json.origin
            ? response.json.origin.split('.').pop()
            : ''; // Handle undefined origin
          const userResponse = 'A'.repeat(len); // Construct the user response

          const chatMessage = {
            user: this.selectedUser,
            sentAt: sentTimestamp,
            message: this.message,
            response: userResponse,
          };

          if (!this.chatHistory[userId]) {
            this.chatHistory[userId] = []; // Initialize the chat history array if it doesn't exist
          }

          this.chatHistory[userId].push([chatMessage]); // Store the user's message and response as a single array

          console.log('User Response:', userResponse); // Log the user response
          console.log('Chat History:', this.chatHistory); // Log the updated chat history

          const textarea = document.getElementById(
            'messageTextArea'
          ) as HTMLTextAreaElement;
          textarea.value = '';

          console.log('chatSession:', this.chatHistory[userId][0][0]);

          const inputTextArea = this.messageTextArea
            .nativeElement as HTMLTextAreaElement;
          this.letterCount += inputTextArea.value.length; // Update the letter count

          inputTextArea.value = '';
        });
    }
  }
}

const loggedInUser = JSON.parse(
  localStorage.getItem('loggedInUser') || '{}'
) as User;
