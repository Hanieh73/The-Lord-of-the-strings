const db = require('../database/connect');

class User {
  constructor({ user_id, username, password, is_admin, name, achievements }) {
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.achievements = achievements;
    this.isAdmin = is_admin;
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM Users WHERE user_id = $1', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query('SELECT * FROM Users WHERE username = $1', [
      username,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password, name, isAdmin } = data;
    let response = await db.query(
      'INSERT INTO Users (username, password, name, achievements) VALUES ($1, $2, $3, $4) RETURNING user_id;',
      [
        username,
        password,
        name,
        `{"Main Storyline Achievements":[{"name":"Neon Navigator","description":"Successfully navigate the neon streets of City 72 without getting lost.","achieved":false},{"name":"Mainframe Master","description":"Unlock all historical stories in the mainframe.","achieved":false},{"name":"Cyber Sleuth","description":"Uncover every hidden secret in City 72.","achieved":false},{"name":"Diplomat of the Dark","description":"Successfully negotiate with all factions in City 72.","achieved":false},{"name":"Futuristic Historian","description":"Complete all historical scenarios in the mainframe.","achieved":false},{"name":"Decisive Leader","description":"Make a critical decision that significantly alters the course of City 72's future.","achieved":false},{"name":"Guardian of the Past","description":"Preserve the integrity and history of City 72.","achieved":false}],"The Heist of the Neon Symphony Achievements":[{"name":"Stealthy Steps","description":"Complete the heist using the Stealth Approach without triggering any alarms.","achieved":false},{"name":"Inside Job Mastermind","description":"Successfully perform the heist using the Inside Job approach without getting caught.","achieved":false},{"name":"High-Octane Heister","description":"Complete the High Octane Heist within a record time.","achieved":false},{"name":"Code Cracker Extraordinaire","description":"Solve all puzzles in the heist without hints.","achieved":false},{"name":"Artful Dodger","description":"Evade Captain Rhys Dalton in the final chase.","achieved":false},{"name":"Neon Nightcrawler","description":"Navigate the night market flawlessly to gather all necessary information.","achieved":false}],"Echoes of the Forgotten War Achievements":[{"name":"Strategic Genius","description":"Perfectly execute the D-Day strategy without any major setbacks.","achieved":false},{"name":"Lone Survivor","description":"Successfully complete the Lone Survivor scenario without losing any troop.","achieved":false},{"name":"Diplomatic Victory","description":"Achieve success in the Diplomatic Resolution without resorting to combat.","achieved":false},{"name":"War Historian","description":"Compile a flawless report on the day's events in the aftermath.","achieved":false},{"name":"Beachhead Hero","description":"Secure the beachhead with minimal casualties.","achieved":false},{"name":"Master Tactician","description":"Optimize resource allocation in the Commando Mission to achieve the best outcome.","achieved":false}],"Rise of the Tech-Magi Achievements":[{"name":"Innovation Pioneer","description":"Successfully develop and integrate a new cybernetic enhancement.","achieved":false},{"name":"Ethical Guardian","description":"Navigate all ethical dilemmas without compromising moral standards.","achieved":false},{"name":"Corporate Espionage Thwarted","description":"Prevent Alex Mercer from stealing any research.","achieved":false},{"name":"AI Whisperer","description":"Effectively communicate and cooperate with the AI entity.","achieved":false},{"name":"Biotech Visionary","description":"Make groundbreaking discoveries in the field of AI and biology.","achieved":false},{"name":"Security Sentinel","description":"Keep all sensitive information secure from rival factions.","achieved":false}],"General Achievements":[{"name":"Story Weaver","description":"Explore all possible endings across all stories.","achieved":false},{"name":"Puzzle Prodigy","description":"Solve all puzzles across the game without errors.","achieved":false},{"name":"Cyberpunk Connoisseur","description":"Interact with every character in the game.","achieved":false},{"name":"Master of City 72","description":"Complete all achievements in the game.","achieved":false}]}`,
      ]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  async update(data) {
    const { achievements } = data;
    const response = await db.query(
      'UPDATE Users SET achievements = $1 WHERE user_id = $2 RETURNING *;',
      [achievements, this.id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update user achievements.');
    }
    return new Story(response.rows[0]);
  }
}

module.exports = User;
