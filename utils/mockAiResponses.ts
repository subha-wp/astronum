import { calculateLifePathNumber, calculateDestinyNumber } from './numerologyCalculations';

export const mockAiResponse = (userQuery: string, user: any): string => {
  const lifePathNumber = user?.dateOfBirth 
    ? calculateLifePathNumber(user.dateOfBirth) 
    : Math.floor(Math.random() * 9) + 1;
    
  const destinyNumber = user?.name 
    ? calculateDestinyNumber(user.name) 
    : Math.floor(Math.random() * 9) + 1;

  // Determine query type based on keywords
  let responseType = 'general';
  
  if (userQuery.toLowerCase().includes('career') || 
      userQuery.toLowerCase().includes('job') || 
      userQuery.toLowerCase().includes('work')) {
    responseType = 'career';
  }
  else if (userQuery.toLowerCase().includes('love') || 
          userQuery.toLowerCase().includes('relationship') || 
          userQuery.toLowerCase().includes('partner')) {
    responseType = 'love';
  }
  else if (userQuery.toLowerCase().includes('money') || 
          userQuery.toLowerCase().includes('finance') ||
          userQuery.toLowerCase().includes('wealth')) {
    responseType = 'money';
  }
  else if (userQuery.toLowerCase().includes('health') || 
          userQuery.toLowerCase().includes('fitness') ||
          userQuery.toLowerCase().includes('wellness')) {
    responseType = 'health';
  }
  
  // Get a personalized response based on the query type and numerology numbers
  return getResponse(responseType, lifePathNumber, destinyNumber);
};

const getResponse = (type: string, lifePathNumber: number, destinyNumber: number): string => {
  const responses: Record<string, Record<number, string[]>> = {
    general: {
      1: [
        "Based on your Life Path Number 1, I sense a strong leadership energy around you. This is a good time to take initiative and embrace new beginnings.",
        "As a Life Path 1, you're naturally independent. The stars suggest focusing on self-reliance and creating your unique path forward.",
      ],
      2: [
        "Your Life Path Number 2 indicates you're a natural mediator. I sense that cooperation and diplomacy will bring you success in current circumstances.",
        "The sensitive and intuitive energy of your Life Path 2 is highlighted now. Trust your feelings and seek balance in all situations."
      ],
      3: [
        "With your Life Path 3, your creative energy is particularly strong right now. Express yourself through art, writing, or meaningful conversations.",
        "Your natural joy and expressiveness (Life Path 3) will help you navigate current challenges. Share your optimism with others."
      ],
      4: [
        "As a Life Path 4, your practical and methodical approach is your strength now. Build solid foundations by focusing on organization and stability.",
        "Your Life Path 4 energy suggests a need for structure. Creating routines and systems will help you achieve your goals efficiently."
      ],
      5: [
        "Your Life Path 5 craves freedom and adventure. The cosmic energies support exploration and trying new experiences that expand your horizons.",
        "With your adaptable Life Path 5 energy, you're well-positioned to embrace change. Stay flexible and open to unexpected opportunities."
      ],
      6: [
        "Your nurturing Life Path 6 energy is highlighted now. Focus on harmony in your home and relationships, and your natural caregiving abilities.",
        "As a Life Path 6, your sense of responsibility is strong. Balance caring for others with self-care for optimal wellbeing."
      ],
      7: [
        "Your Life Path 7's analytical and spiritual nature is amplified now. Take time for deep thinking and connect with your inner wisdom.",
        "The mystical energy of your Life Path 7 guides you toward truth. Research, study, and contemplation will yield valuable insights."
      ],
      8: [
        "With your Life Path 8, the universal energies support your ambitions. Focus on practical achievements and recognize your natural authority.",
        "Your Life Path 8's manifestation power is strong right now. Direct your energy toward ambitious goals with confidence and determination."
      ],
      9: [
        "Your Life Path 9 brings compassionate and humanitarian energy. The universe supports your efforts to make a difference in others' lives.",
        "The completion energy of your Life Path 9 suggests it's time to let go of what no longer serves you, making space for new beginnings."
      ],
    },
    career: {
      1: [
        "With Life Path 1, your career thrives when you take leadership. Now is an excellent time to pitch ideas or pursue a promotion where you can exercise more autonomy.",
        "As a natural pioneer (Life Path 1), consider entrepreneurial ventures or roles where you can innovate and lead. Your original thinking is highly valuable now."
      ],
      2: [
        "Your Life Path 2 indicates success through collaboration. Team projects and supportive work environments will bring out your best professional qualities now.",
        "Consider careers in counseling, HR, or mediation that utilize your Life Path 2's natural diplomacy and intuition. Partnership opportunities look especially promising."
      ],
      3: [
        "Your Life Path 3 creative energy is particularly strong in your career path now. Marketing, design, writing, or entertainment fields will allow your expressive nature to shine.",
        "With your communications gift (Life Path 3), teaching, sales, or public relations roles would be fulfilling. Share your optimistic perspective professionally."
      ],
      4: [
        "Your Life Path 4 methodical approach makes you excel in technical, financial, or operational roles requiring attention to detail and reliability.",
        "Career advancement now depends on showcasing your Life Path 4 strengths: organization, discipline, and practical problem-solving. Construction, engineering, or accounting could be favorable."
      ],
      5: [
        "With your adaptable Life Path 5 energy, consider roles involving travel, variety, or change. Sales, marketing, journalism, or tour guide positions would satisfy your need for freedom in your career.",
        "Your versatile nature (Life Path 5) is an asset in today's changing workplace. Roles requiring quick thinking and adaptation to new technology or markets would be fulfilling."
      ],
      6: [
        "Your nurturing Life Path 6 energy makes you well-suited for careers in teaching, healthcare, counseling, or hospitality. Your ability to create harmony is valuable in any workplace.",
        "Consider leadership positions that allow you to mentor others. Your Life Path 6's responsible nature makes you excellent at roles requiring reliability and care."
      ],
      7: [
        "With your analytical Life Path 7, research, academia, technical writing, or specialized consulting would be fulfilling. Your depth of understanding brings unique insights to complex problems.",
        "Your path suggests success in fields requiring deep concentration and specialized knowledge. Technology, science, archaeology, or philosophy align with your introspective nature."
      ],
      8: [
        "Your Life Path 8 indicates natural business acumen. Executive roles, financial services, real estate, or entrepreneurship channels your ambition and organizational talents.",
        "Career advancement now comes through showcasing your management skills and vision. Your natural authority (Life Path 8) makes you well-suited for positions of responsibility."
      ],
      9: [
        "With your humanitarian Life Path 9, consider careers in non-profits, counseling, teaching, or healthcare where you can make a meaningful difference in many lives.",
        "Your compassionate nature combined with broad vision makes you effective in global organizations, social services, or artistic pursuits with universal themes."
      ],
    },
    love: {
      1: [
        "Your Life Path 1 independence means you need a partner who respects your autonomy. Look for someone strong enough to be your equal but not competing for control.",
        "In relationships, your leadership qualities (Life Path 1) can sometimes come across as dominant. Balance assertiveness with compromise for harmony with your partner."
      ],
      2: [
        "As a Life Path 2, you thrive in harmonious partnerships. Your sensitivity makes you an attentive partner, but ensure your needs are also being met.",
        "Your intuitive nature helps you understand your partner deeply. Maintaining healthy boundaries will prevent the emotional overwhelm that Life Path 2 individuals can experience."
      ],
      3: [
        "With your expressive Life Path 3, communication is key in relationships. Your partner should appreciate your creativity and joy while providing some grounding.",
        "Your natural charm attracts many, but a lasting relationship requires someone who appreciates your depth beyond the social persona that comes with Life Path 3."
      ],
      4: [
        "Your stable Life Path 4 energy seeks security in relationships. You build love slowly but durably, requiring honesty and reliability from partners.",
        "Don't let your practicality overshadow romance. Balance your natural sense of duty (Life Path 4) with spontaneity to keep relationships fresh and exciting."
      ],
      5: [
        "Your free-spirited Life Path 5 needs a partner who doesn't restrict your sense of adventure. Look for someone who joins your journeys rather than limiting them.",
        "Commitment may feel challenging with your adaptable nature, but the right relationship will feel liberating rather than confining. Communication about expectations is crucial."
      ],
      6: [
        "As a nurturing Life Path 6, you create beautiful harmony in relationships but may take on too much responsibility. Ensure partnership is balanced.",
        "Your romantic nature and desire for beauty make you an attentive partner. Be careful not to idealize your relationship or partner to unrealistic standards."
      ],
      7: [
        "Your thoughtful Life Path 7 requires intellectual connection. Seek someone who respects your need for solitude while sharing meaningful conversation.",
        "You may be selective and take time to commit, which is perfectly aligned with your analytical nature. Trust is built through understanding with deep thinkers like yourself."
      ],
      8: [
        "With your ambitious Life Path 8, look for a partner who supports your goals while maintaining their own identity and purpose.",
        "Balance power dynamics in relationships. Your natural authority works best with someone confident enough to be your equal rather than dominated by your strong personality."
      ],
      9: [
        "Your compassionate Life Path 9 loves deeply and broadly. The ideal partner understands your humanitarian spirit isn't a distraction from your relationship.",
        "Past relationships strongly influence your current connections. Your forgiving nature helps heal old wounds, creating space for more fulfilling partnerships now."
      ],
    },
    money: {
      1: [
        "Your Life Path 1 indicates an entrepreneurial approach to finances. Independent ventures and bold investments align with your innovative energy now.",
        "Financial independence is crucial for you. Consider creating multiple income streams that allow you to exercise your leadership abilities while building security."
      ],
      2: [
        "With Life Path 2, financial partnerships work well for you. Collaborative investments or shared business ventures could be particularly successful now.",
        "Your intuition about money matters is strong. Trust your feelings about financial opportunities, especially when they involve cooperative endeavors."
      ],
      3: [
        "Your creative Life Path 3 suggests success through innovative financial approaches. Consider investments in arts, entertainment, or communications.",
        "While you may prefer not to focus on financial details, developing consistent money habits will support your creative pursuits and expressive lifestyle."
      ],
      4: [
        "Your practical Life Path 4 gives you natural financial discipline. Traditional, steady investments and methodical saving will build your security.",
        "Property investments or ventures requiring careful planning align with your methodical nature. Your patience with financial growth will be rewarded."
      ],
      5: [
        "With adaptable Life Path 5 energy, diverse investments and multiple income streams suit your versatile nature. Be careful not to scatter your resources too widely.",
        "Your relationship with money may fluctuate more than others. Creating flexible budget systems that allow for spontaneity while maintaining security will serve you well."
      ],
      6: [
        "Your nurturing Life Path 6 suggests success in investments related to home, family, or community wellbeing. Consider real estate or businesses that enhance quality of life.",
        "You may tend to be generous with resources. Balance caring for others' financial needs with building your own security for long-term stability."
      ],
      7: [
        "Your analytical Life Path 7 gives you insight into complex financial matters. Research-based investments in technology or innovative sectors could be favorable.",
        "Your thoughtful approach to money means you prefer quality over quantity. Specialized investments requiring deep understanding of particular markets suit your nature."
      ],
      8: [
        "With Life Path 8, you have natural financial acumen. Executive leadership, real estate, or substantial business investments align with your practical manifestation energy.",
        "Your relationship with money is tied to your sense of personal power and achievement. Creating structures that generate long-term wealth suits your ambitious nature."
      ],
      9: [
        "Your humanitarian Life Path 9 suggests financial success through ventures that benefit many. Consider socially responsible investments or businesses with charitable components.",
        "While material wealth isn't your primary motivation, creating abundance allows you to be more generous. Balance philanthropy with practical financial management."
      ],
    },
    health: {
      1: [
        "With your energetic Life Path 1, activities that challenge you individually like running, martial arts or personal training would benefit your health now.",
        "Managing stress through physical outlets is important for your dynamic nature. Incorporate activities that allow you to expend energy while developing personal discipline."
      ],
      2: [
        "Your sensitive Life Path 2 benefits from gentle, balancing health practices. Consider yoga, tai chi, or dance to enhance your natural grace and emotional wellbeing.",
        "Pay attention to emotional health as it directly affects your physical wellness. Partner-based activities and supportive group classes align with your harmonious nature."
      ],
      3: [
        "Your expressive Life Path 3 thrives with creative movement. Dance, expressive arts therapy, or sports with social elements would benefit both body and spirit.",
        "Your throat, respiratory system, and creative expression are connected. Activities involving voice, breath work, and artistic movement will enhance your overall wellness."
      ],
      4: [
        "With structured Life Path 4 energy, consistent exercise routines and practical nutrition plans work best for you. Strength training and endurance sports build upon your natural discipline.",
        "Pay attention to skeletal and dental health. Your practical nature responds well to health regimens with measurable outcomes and consistent scheduling."
      ],
      5: [
        "Your adaptive Life Path 5 benefits from variety in health practices. Mixing different exercise styles, outdoor adventures, and changing routines prevents stagnation.",
        "Your nervous system and sensory organs need special attention. Activities involving balance, coordination, and sensory engagement support your versatile energy."
      ],
      6: [
        "Your nurturing Life Path 6 responds well to holistic health approaches. Consider family-based activities, community sports, or practices that create harmony between mind and body.",
        "Heart and circulatory health deserve focus. Balance caring for others' wellbeing with self-nurturing practices that replenish your generous spirit."
      ],
      7: [
        "Your introspective Life Path 7 benefits from mindful practices. Meditation, thoughtful walking, swimming, or tai chi support your contemplative nature.",
        "Mental and physical health are closely linked for you. Practices combining intellectual understanding with physical awareness create integrated wellness."
      ],
      8: [
        "With powerful Life Path 8 energy, strength-building and endurance activities align with your natural vitality. Consider weight training, boxing, or challenging physical pursuits.",
        "Balancing ambition with rest is essential. Your drive can lead to overlooking signs of stress, so incorporate recovery practices into your achievement-oriented lifestyle."
      ],
      9: [
        "Your compassionate Life Path 9 benefits from health practices with spiritual dimensions. Walking meditation, qigong, or swimming can provide both physical benefits and contemplative space.",
        "Your empathetic nature may absorb others' energies. Regular cleansing practices, whether physical detoxification or energy clearing, support your sensitive system."
      ],
    },
  };

  // Select the appropriate response type
  const typeResponses = responses[type] || responses.general;
  
  // Get responses for this life path number
  const lifePathResponses = typeResponses[lifePathNumber] || typeResponses[1];
  
  // Randomly select one response
  return lifePathResponses[Math.floor(Math.random() * lifePathResponses.length)];
};