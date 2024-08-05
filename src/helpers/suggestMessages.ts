export const specialChar = "||";
export const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const preGenerateMessages: string[] = [
  "What's a skill you've always wanted to learn, and why?||If you could visit any fictional world from a book or movie, where would you go and what would you do there?||What's the most memorable adventure you've had, whether big or small, and what made it special to you?",
  "What's a dream destination you've always wanted to visit?||If you could learn any new skill overnight, what would it be and why?||What's a book or movie that profoundly impacted your perspective on life?",
  "What's a dream you've always had, but haven't pursued yet, and what's holding you back?||If you could instantly become an expert in one field, what would it be, and how would you use your newfound knowledge?||What's a song that never fails to lift your spirits, and why does it resonate with you?",
  "If you could invent a new holiday, what would it celebrate and how would people observe it?||What's a quote or saying that inspires you whenever you hear it, and why does it resonate with you?||If you could swap lives with any fictional character for a day, who would it be and what would you do in their shoes?",
  "What's a childhood dream you've always wanted to fulfill, and have you taken any steps towards making it a reality?||If you could magically learn one new skill overnight, what would it be and why?||Imagine you could have a conversation with your future self. What's one piece of advice you hope your future self would give you?",
  "What's a place you've always wanted to visit, and what intrigues you most about it?||If you could learn any language instantly, which one would you choose and why?||Imagine you could live in any fictional world for a week. Which world would you choose, and what adventures would you embark on?",
];

export const generateRandomMessages = (): string => {
  const randomIndex = Math.floor(Math.random() * preGenerateMessages.length);
  return preGenerateMessages[randomIndex];
};
