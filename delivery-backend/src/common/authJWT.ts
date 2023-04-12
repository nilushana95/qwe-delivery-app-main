export default class JwtKey {
  static getPublicKey = () => {
    return (
      process.env.RSA_PUBLIC_KEY ??
      '-----BEGIN PUBLIC KEY-----\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArUMavX9hyRJJhUbslPSq\n' +
        '63+R4lX9GG6LUcYcciQgXKquGKrPMhSky/f06y4vMXtT0qIOWF3dbL+6Iuj1bGnT\n' +
        'XAz3SoTNoYSzbi77Xf8HyQsKAtk4TbdSM2xgz8NYeOJYdHpAvgMyqdkOxM9bBhlQ\n' +
        'ku2SdOthcbskMnxgVMHxLYy3218GqBX2A5XAiVbMOwPJmVqBpc8rSNV1hhA78Zum\n' +
        'yjBj5L42yg89Pk3kqeqX17J8SJDcZ4whwP1qO5pB7kZYIx8+ZlqNNEcOqMWg0GZa\n' +
        'YWXEPqQxgifJLd2E/vVJ2aMKgvcaKl9zSzvXcEiWZ0FiD/OXqpAlVQUmsjUyc0ti\n' +
        'EwIDAQAB\n' +
        '-----END PUBLIC KEY-----'
    );
  };
  static getPrivateKey = () => {
    return (
      process.env.RSA_PRIVATE_KEY ??
      '-----BEGIN PRIVATE KEY-----\n' +
        'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtQxq9f2HJEkmF\n' +
        'RuyU9Krrf5HiVf0YbotRxhxyJCBcqq4Yqs8yFKTL9/TrLi8xe1PSog5YXd1sv7oi\n' +
        '6PVsadNcDPdKhM2hhLNuLvtd/wfJCwoC2ThNt1IzbGDPw1h44lh0ekC+AzKp2Q7E\n' +
        'z1sGGVCS7ZJ062FxuyQyfGBUwfEtjLfbXwaoFfYDlcCJVsw7A8mZWoGlzytI1XWG\n' +
        'EDvxm6bKMGPkvjbKDz0+TeSp6pfXsnxIkNxnjCHA/Wo7mkHuRlgjHz5mWo00Rw6o\n' +
        'xaDQZlphZcQ+pDGCJ8kt3YT+9UnZowqC9xoqX3NLO9dwSJZnQWIP85eqkCVVBSay\n' +
        'NTJzS2ITAgMBAAECggEACWgJPZx6zJXHlArDsVqPJPXqD6WndfoaajgdNz0q3J0P\n' +
        'kptDYG6qe8BcdaAuQ7t0U40kxjtiWBMYoeiP2nDsXqT9j/ghydEQhLzcPMApxgpp\n' +
        'Yro0SlPXjJ8nql/qn7V6I+i3NxmpWHtGR/0R7gTV0QRA3UQiKDCGyI7kE/XriBNy\n' +
        'tKPUu7DxOmQeWbIVY460oBbFCVNQES0ey1wQSMtte2CYy0OdvHbRuwhOmVnzYTWO\n' +
        'h8c6Ys/J7Q8HMxm2CqobDz2svKGjtDhjq2Oz69mCJCD0rjFn1em3Q1DV/XctzW9H\n' +
        '970ocTw/ttDxXGJ2ZPvrQLPmwaZfgtHmsDP5j8CwIQKBgQDoptqZjAyZDLQFvp6r\n' +
        'Q4aUwQTGgCkoKJ34UepV7cRNz61kfnTEdKTbtcHA7jUFXXT6RPR44cgy6t9Mvk0K\n' +
        '/yubWt3X7eoDqwGd2DyefJdc8aU55cY6nwPk8K5jhYrTMfdtQBpZjQC4qH/J0YR9\n' +
        'WJAU7gmPAv8+b3xiOp1luo6K6wKBgQC+pnLFf8iKoQUTcsO07EIMyIyeyq2J7Qvj\n' +
        'oHGdtwTM56euGv9D/eI8j71hWPQd1YzQ63Pw1JxOnRBtDrhWtYiNxgtLiffsjNyw\n' +
        'SnbtWZsK2G7j6jNwiF7zRj4le1isJFrI7wfo4PQsh1ia1eSQP07/9O8b+DaXqkoP\n' +
        '3SOwP7LreQKBgQDW1a0q+R5w/kAGxf1zHQnbt1mXi6V1xfwJ4GrKKqOJTutIz1U4\n' +
        'TJYnpPFkHROs/p4UtTQjpCrgie7lyR0PuI4mCYSt7q6X8IOvpIxltZt4YlQ24K1q\n' +
        'WIiaEn6WvCxz1cIrinRKmWA/JKnMTcNQlEWIbj85ZoUYvI5ZjtLlq54RPQKBgQCe\n' +
        'oVwp3LL+NhBFKF6SsWobvNrUXQucEbKsyZj/g4LpA29PvILdDegqP+dxklQ8Zq1u\n' +
        'QBsOLbmI58L9GxxieVWPsVNAnSG+n04ZGTxvLPmGQqOx2/LFFZL7lFytTz5urSkk\n' +
        'u063hEVmr48X9hThuOuAqUoy2YqDE1vgaz4Arl+u8QKBgEVuZWZYzlqo2hejlNrt\n' +
        'ZtlaTSXXNtVyuReqZgBX7MPIPoeItBc6GvwGDD31sizFsPl+h4ch5qwvdVR+h0Fs\n' +
        'eOTJD0fs01kbcRvTvveoU01zTHeW/wwTvt+lcIYt/kdolRVRZxXtyC18Njg6dajq\n' +
        'HFmRG8+RqZ3ZZz5d0nr0ZCp6\n' +
        '-----END PRIVATE KEY-----'
    );
  };
}
