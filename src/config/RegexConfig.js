export const RegexConfig = {
  splitName: /^[a-zA-Z]+$/,
  phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  email:
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  name: /^[A-Za-z'-]+(\s?[A-Za-z'-])+?$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  username: /^[a-z0-9_-]{3,16}$/,
  alphanumeric: /^[0-9a-zA-Z]+$/,
  alphanumericMultiWord: /^[0-9a-zA-Z-,.'/ ]{0,}$/,
  alphanumericWithPunctuation: /^[a-zA-Z0-9,.!?"':;\-\s]*$/,
};
