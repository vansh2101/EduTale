import React, { Component } from 'react';

class parseAPIoutput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paragraph: `
        Bob: Hey, what are you looking at?
        Alice: This diagram here has been drawing my attention for a while now. I was trying to figure out what it might be illustrating, and then it hit me.
        Bob: Ok so what is it?
        Alice: It's an illustration of the photoelectric effect.
        Bob: Photoelectric effect? Never heard of it. Care to explain?
        Alice: Sure! It's a phenomenon in which electrons are ejected from the surface of a metal when light is incident on it. These electrons ejected from the metal are called photoelectrons.
        Bob: Interesting! How does it work?
        Alice: Good question! Whenever light strikes the metal, it excites the atomic electrons, causing them to break free from the atom and become the photoelectric electrons that are released. Depending on the intensity of the incident light, the energy of the photoelectron released can be very high.
        Bob: So, you're saying the light not only excites the electrons, it also gives them energy?
        Alice: Exactly! It turns out that the higher the frequency of the incident light, the higher the energy of the photoelectrons emitted.
        Bob: Hmm, I'm still a bit confused as to what makes this effect different from other phenomena like reflection and refraction.
        Alice: Well, the key difference between the photoelectric effect and reflection or refraction lies in the fact that in order for the photoelectric effect to occur, light must be intense enough to break the bond between an electron and an atom. That kind of interaction isn't present with reflection or refraction.
        Bob: Now that I understand the basis of the photoelectric effect, what is its practical application?
        Alice: The photoelectric effect has a wide variety of applications. For example, it is used in some security systems, where light sensors detect the presence of individuals in a specific area. It is also used in solar power generation, since solar cells use the photoelectric effect to convert light into electricity. The effect can also be used to measure the intensity of light, since when the electrons are emitted, the number of electrons is proportional to the intensity of light. Finally, it is used in photo-therapy, a treatment for certain kinds of skin disorders.
        Bob: Wow, all these applications! I must admit I'm really impressed.
        Alice: I'm glad I could help! I find the photoelectric effect fascinating, don't you?
        Bob: Definitely! Thanks for providing such comprehensive information.
        Alice: Anytime!
      `,
      conversation: [],
    };
  }

  componentDidMount() {
    this.generateConversationArray();
  }

  generateConversationArray() {
    const { paragraph } = this.state;
    const lines = paragraph.split('\n').map(line => line.trim());
    const conversation = [];
    let currentSpeaker = '';

    for (const line of lines) {
      if (line) {
        const parts = line.split(': ');
        if (parts.length === 2) {
          currentSpeaker = parts[0].trim();
          const sentence = parts[1].trim();
          conversation.push({ name: currentSpeaker, sentence });
          console.log(parts);
        }
      }
    }

    this.setState({ conversation });
  }

  render() {
    const { conversation } = this.state;

    return (
      <div>
        {conversation.map((item, index) => (
          <div key={index}>
            <strong>{item.name}:</strong> {item.sentence}
          </div>
        ))}
      </div>
    );
  }
}

export default parseAPIoutput;
