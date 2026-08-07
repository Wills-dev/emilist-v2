import { MessageThread } from "../types";

export const messageThreads: MessageThread[] = [
  {
    id: "thread-1",
    participant: {
      id: "user-1",
      name: "Simisola Adeking",
      avatar: "/assets/images/profile-preview.svg",
      isOnline: true,
    },
    preview: "I’m looking forward to working with you.",
    lastMessageAt: "1h ago",
    unreadCount: 3,
    messages: [
      {
        id: "message-1",
        sender: "participant",
        text: "Hi. My name is Simisola Adeking. I’m new on this app and have been assigned as your success coach. I’m looking forward to working with you. Nice to meet you.",
        time: "12:15pm",
        status: "sent",
        dateLabel: "Monday 10.20pm",
      },
      {
        id: "message-2",
        sender: "current-user",
        text: "Hey! Simisola. My name is King Dave, nice to meet you. Would help you with all your questions on Product Design.",
        time: "1:15pm",
        status: "read",
      },
      {
        id: "message-3",
        sender: "participant",
        text: "Thanks for agreeing to take this project with me. I really appreciate it.",
        time: "1:18pm",
        status: "sent",
      },
      {
        id: "message-4",
        sender: "current-user",
        text: "Don’t you love the Tech1m web app, King Ayo 👑 and friends designed it 😊",
        time: "2:05pm",
        status: "read",
      },
      {
        id: "message-5",
        sender: "current-user",
        text: "I love your display picture, is that your dog? I wish to get a bull dog too.",
        time: "2:05pm",
        status: "read",
      },
      {
        id: "message-6",
        sender: "participant",
        text: "Yes. It’s mine. Her name is Femi! 😂",
        time: "2:08pm",
        status: "sent",
      },
      {
        id: "message-7",
        sender: "current-user",
        text: "Oh wow! That’s a funny name for a dog. Don’t you think?",
        time: "11:05am",
        status: "read",
        dateLabel: "Tuesday 10.00am",
      },
      {
        id: "message-8",
        sender: "participant",
        text: "Lol, it’s a Nigerian name 💪🏽",
        time: "2:08pm",
        status: "sent",
      },
    ],
  },
  {
    id: "thread-2",
    participant: {
      id: "user-2",
      name: "Semi Ajayi",
      avatar: "/assets/images/profile-view2.svg",
    },
    preview: "The revised schedule works for me.",
    lastMessageAt: "1h ago",
    unreadCount: 2,
    messages: [
      {
        id: "message-9",
        sender: "participant",
        text: "Hello, the revised schedule works for me. Thank you.",
        time: "9:42am",
        status: "sent",
        dateLabel: "Today",
      },
    ],
  },
  {
    id: "thread-3",
    participant: {
      id: "user-3",
      name: "James Ola",
      avatar: "/assets/images/profile-view3.svg",
      isOnline: true,
    },
    preview: "I have uploaded the requested document.",
    lastMessageAt: "1h ago",
    unreadCount: 1,
    messages: [
      {
        id: "message-10",
        sender: "participant",
        text: "I have uploaded the requested document for your review.",
        time: "9:21am",
        status: "sent",
        dateLabel: "Today",
      },
    ],
  },
  {
    id: "thread-4",
    participant: {
      id: "user-4",
      name: "Kemi Adeosun",
      avatar: "/assets/images/avatar.svg",
    },
    preview: "Can we discuss the next milestone?",
    lastMessageAt: "1h ago",
    unreadCount: 1,
    messages: [
      {
        id: "message-11",
        sender: "participant",
        text: "Can we discuss the next milestone this afternoon?",
        time: "8:55am",
        status: "sent",
        dateLabel: "Today",
      },
    ],
  },
  {
    id: "thread-5",
    participant: {
      id: "user-5",
      name: "Mike Dabira",
      avatar: "/assets/images/profile-preview.svg",
    },
    preview: "The payment has been confirmed.",
    lastMessageAt: "1h ago",
    unreadCount: 1,
    messages: [
      {
        id: "message-12",
        sender: "participant",
        text: "The payment has been confirmed. Thanks.",
        time: "8:30am",
        status: "sent",
        dateLabel: "Today",
      },
    ],
  },
  {
    id: "thread-6",
    participant: {
      id: "user-6",
      name: "Kennedy Jane",
      avatar: "/assets/images/profile-view2.svg",
    },
    preview: "I’ll send the estimate before noon.",
    lastMessageAt: "1h ago",
    unreadCount: 1,
    messages: [
      {
        id: "message-13",
        sender: "participant",
        text: "I’ll send the complete estimate before noon.",
        time: "8:02am",
        status: "sent",
        dateLabel: "Today",
      },
    ],
  },
  {
    id: "thread-7",
    participant: {
      id: "user-7",
      name: "Musa Yahaya",
      avatar: "/assets/images/profile-view3.svg",
    },
    preview: "Thank you for the update.",
    lastMessageAt: "1h ago",
    unreadCount: 1,
    messages: [
      {
        id: "message-14",
        sender: "participant",
        text: "Thank you for the update. I’ll proceed from here.",
        time: "7:48am",
        status: "sent",
        dateLabel: "Today",
      },
    ],
  },
];

export const emptyMessageThreads: MessageThread[] = [];
