/* Deterministic synthetic fixtures. No real personal data. */
(function (root) {
  'use strict';
  const rule = (field, op, value, label, category, tolerance = 0, relative = false) =>
    ({ field, op, value, label, category, tolerance, relative });
  const soft = (r, weight) => ({ ...r, weight });
  const profile = { gender: 'woman', age: 30, height: 65, city: 'Bengaluru', education: 'postgraduate', income: 28, diet: 'vegetarian', smoking: false, drinking: 'occasionally', wantsChildren: true, maritalStatus: 'never married', motherTongue: 'Kannada' };
  const smoking = rule('smoking', 'eq', false, 'Non-smoker', 'smoking/drinking');
  const children = rule('wantsChildren', 'eq', true, 'Wants children', 'children');
  const age = rule('age', 'range', [29, 34], 'Age 29–34', 'age', 1);
  const diet = rule('diet', 'eq', 'vegetarian', 'Vegetarian', 'diet');
  const clients = [
    { id: 'c1', name: 'Ananya Rao', profile: { ...profile }, dealbreakers: [smoking, children, age], softPreferences: [
      soft(rule('height', 'min', 70, 'Height ≥ 5′10″', 'height', 2), 8),
      soft(rule('city', 'eq', 'Bengaluru', 'Lives in Bengaluru', 'location'), 6),
      soft(rule('education', 'eq', 'postgraduate', 'Postgraduate', 'education'), 5),
      soft(rule('income', 'min', 30, 'Income ≥ ₹30L', 'income', .15, true), 3), soft(diet, 2)] },
    { id: 'c2', name: 'Rohan Mehta', profile: { ...profile, gender: 'man', age: 32, height: 71, city: 'Mumbai', income: 42, motherTongue: 'Gujarati' }, dealbreakers: [smoking, diet], softPreferences: [soft(rule('city', 'eq', 'Mumbai', 'Lives in Mumbai', 'location'), 9), soft(rule('age', 'range', [27, 33], 'Age 27–33', 'age', 1), 6), soft(rule('education', 'eq', 'postgraduate', 'Postgraduate', 'education'), 4)] },
    { id: 'c3', name: 'Meera Nair', profile: { ...profile, age: 33, city: 'Pune', maritalStatus: 'divorced', motherTongue: 'Malayalam' }, dealbreakers: [children, rule('age', 'range', [30, 38], 'Age 30–38', 'age', 1)], softPreferences: [soft(rule('city', 'eq', 'Pune', 'Lives in Pune', 'location'), 8), soft(rule('income', 'min', 25, 'Income ≥ ₹25L', 'income', .15, true), 5), soft(smoking, 7)] },
    { id: 'c4', name: 'Kabir Sethi', profile: { ...profile, gender: 'man', age: 35, height: 72, city: 'Delhi', income: 50, wantsChildren: false, diet: 'non-vegetarian', motherTongue: 'Hindi' }, dealbreakers: [rule('wantsChildren', 'eq', false, 'Does not want children', 'children'), smoking], softPreferences: [soft(rule('city', 'eq', 'Delhi', 'Lives in Delhi', 'location'), 6), soft(rule('education', 'eq', 'postgraduate', 'Postgraduate', 'education'), 8), soft(rule('height', 'min', 65, 'Height ≥ 5′5″', 'height', 2), 3)] },
    { id: 'c5', name: 'Ishita Sen', profile: { ...profile, age: 29, city: 'Hyderabad', motherTongue: 'Bengali' }, dealbreakers: [smoking, rule('maritalStatus', 'eq', 'never married', 'Never married', 'marital status')], softPreferences: [soft(rule('city', 'eq', 'Hyderabad', 'Lives in Hyderabad', 'location'), 7), soft(rule('income', 'min', 35, 'Income ≥ ₹35L', 'income', .15, true), 8), soft(children, 4), soft(diet, 3)] }
  ];
  const rows = [
    ['Advaith Hegde', 'man', 31, 72, 'Bengaluru', 'postgraduate', 35, 'vegetarian', true, 'occasionally', true, 'never married', 'Kannada'],
    ['Rishabh Malhotra', 'man', 32, 71, 'Bengaluru', 'postgraduate', 24, 'non-vegetarian', false, 'occasionally', true, 'never married', 'Hindi'],
    ['Chirag Kulkarni', 'man', 30, 67, 'Pune', 'postgraduate', 38, 'vegetarian', false, 'never', true, 'never married', 'Marathi'],
    ['Arjun Menon', 'man', 33, 69, 'Bengaluru', 'graduate', 28, 'vegetarian', false, 'never', true, 'never married', 'Malayalam'],
    ['Dev Shah', 'man', 35, 72, 'Mumbai', 'postgraduate', 44, 'vegetarian', false, 'occasionally', true, 'never married', 'Gujarati'],
    ['Nikhil Iyer', 'man', 29, 70, 'Hyderabad', 'graduate', 32, 'vegetarian', false, 'never', true, 'never married', 'Tamil'],
    ['Aman Kapoor', 'man', 34, 73, 'Delhi', 'postgraduate', 48, 'non-vegetarian', false, 'occasionally', false, 'divorced', 'Hindi'],
    ['Sahil Jain', 'man', 28, 68, 'Pune', 'graduate', 22, 'vegetarian', true, 'regularly', true, 'never married', 'Hindi'],
    ['Pranav Rao', 'man', 31, 70, 'Bengaluru', 'postgraduate', 36, 'vegetarian', false, 'never', true, 'never married', 'Kannada'],
    ['Aditya Bose', 'man', 36, 71, 'Hyderabad', 'postgraduate', 52, 'non-vegetarian', false, 'occasionally', true, 'divorced', 'Bengali'],
    ['Kunal Suri', 'man', 32, 69, 'Delhi', 'graduate', 29, 'vegetarian', false, 'never', false, 'never married', 'Punjabi'],
    ['Varun Desai', 'man', 30, 72, 'Mumbai', 'postgraduate', 40, 'vegetarian', false, 'occasionally', true, 'never married', 'Gujarati'],
    ['Rahul Pillai', 'man', 37, 68, 'Pune', 'postgraduate', 33, 'non-vegetarian', true, 'occasionally', true, 'divorced', 'Malayalam'],
    ['Vivek Das', 'man', 34, 70, 'Hyderabad', 'graduate', 26, 'vegetarian', false, 'never', true, 'never married', 'Bengali'],
    ['Sameer Ali', 'man', 31, 71, 'Delhi', 'postgraduate', 46, 'non-vegetarian', false, 'never', false, 'never married', 'Urdu'],
    ['Aditi Shah', 'woman', 29, 66, 'Mumbai', 'postgraduate', 32, 'vegetarian', false, 'never', true, 'never married', 'Gujarati'],
    ['Neha Rao', 'woman', 30, 65, 'Bengaluru', 'postgraduate', 28, 'vegetarian', false, 'occasionally', true, 'never married', 'Kannada'],
    ['Priya Menon', 'woman', 32, 67, 'Pune', 'graduate', 24, 'non-vegetarian', false, 'never', true, 'divorced', 'Malayalam'],
    ['Tara Sethi', 'woman', 33, 68, 'Delhi', 'postgraduate', 42, 'vegetarian', false, 'occasionally', false, 'never married', 'Hindi'],
    ['Rhea Sen', 'woman', 28, 64, 'Hyderabad', 'postgraduate', 36, 'non-vegetarian', true, 'regularly', true, 'never married', 'Bengali'],
    ['Kavya Iyer', 'woman', 31, 66, 'Bengaluru', 'postgraduate', 38, 'vegetarian', false, 'never', true, 'never married', 'Tamil'],
    ['Simran Kaur', 'woman', 34, 69, 'Delhi', 'graduate', 31, 'non-vegetarian', false, 'occasionally', false, 'divorced', 'Punjabi'],
    ['Pooja Patel', 'woman', 27, 65, 'Mumbai', 'graduate', 23, 'vegetarian', false, 'never', true, 'never married', 'Gujarati'],
    ['Sneha Das', 'woman', 35, 67, 'Hyderabad', 'postgraduate', 45, 'vegetarian', false, 'occasionally', true, 'never married', 'Bengali'],
    ['Diya Nair', 'woman', 30, 64, 'Pune', 'postgraduate', 30, 'non-vegetarian', true, 'occasionally', true, 'never married', 'Malayalam'],
    ['Sana Khan', 'woman', 32, 66, 'Delhi', 'postgraduate', 37, 'non-vegetarian', false, 'never', false, 'never married', 'Urdu'],
    ['Anjali Gupta', 'woman', 29, 68, 'Bengaluru', 'graduate', 27, 'vegetarian', false, 'occasionally', true, 'never married', 'Hindi'],
    ['Mitali Roy', 'woman', 33, 65, 'Hyderabad', 'postgraduate', 41, 'vegetarian', false, 'never', true, 'divorced', 'Bengali'],
    ['Shreya Joshi', 'woman', 31, 67, 'Pune', 'postgraduate', 34, 'vegetarian', false, 'never', true, 'never married', 'Marathi'],
    ['Naina Batra', 'woman', 34, 66, 'Mumbai', 'graduate', 29, 'non-vegetarian', false, 'occasionally', false, 'never married', 'Punjabi']
  ];
  const fields = ['name','gender','age','height','city','education','income','diet','smoking','drinking','wantsChildren','maritalStatus','motherTongue'];
  const candidates = rows.map((row, i) => ({ id: `p${i + 1}`, ...Object.fromEntries(fields.map((f,j) => [f,row[j]])), dealbreakers: i < 3 ? [] : [rule('age','range', i % 4 === 0 ? [31,39] : [26,38], i % 4 === 0 ? 'Age 31–39' : 'Age 26–38','age'), ...(i % 6 === 0 ? [rule('wantsChildren','eq',false,'Does not want children','children')] : [])] }));
  const aliases = ['A', 'B', 'C'];
  candidates.forEach((person, i) => {
    if (i < 3) person.assignmentAlias = aliases[i];
    person.softPreferences = [
      soft(rule('height', 'min', person.gender === 'man' ? 64 : 69, `Height ≥ ${person.gender === 'man' ? 64 : 69} inches`, 'height', 2), 5),
      soft(rule('city', 'eq', person.city, `Lives in ${person.city}`, 'location'), 7),
      soft(rule('education', 'eq', 'postgraduate', 'Postgraduate', 'education'), 4),
      soft(rule('income', 'min', 25 + i % 3 * 5, `Income ≥ ₹${25 + i % 3 * 5}L`, 'income', .15, true), 3)
    ];
  });
  candidates[1].softPreferences = [
    soft(rule('height', 'min', 64, 'Height ≥ 5′4″', 'height', 2), 5),
    soft(rule('city', 'eq', 'Bengaluru', 'Lives in Bengaluru', 'location'), 7),
    soft(rule('education', 'eq', 'postgraduate', 'Postgraduate', 'education'), 4),
    soft(diet, 2)
  ];
  const clone = value => JSON.parse(JSON.stringify(value));
  // One person record, whether paying client or sourced prospect. UI joins by ID.
  const people = [
    ...clients.map((c, i) => ({ ...clone(c.profile), id:c.id, name:c.name,
      isClient:true, assignedMatchmaker:i % 2 ? 'B' : 'A', source:'TDC',
      dealbreakers:clone(c.dealbreakers), softPreferences:clone(c.softPreferences) })),
    ...candidates.map((c, i) => ({ ...clone(c), isClient:false,
      assignedMatchmaker:null, source:i % 2 ? 'Jeevansathi' : 'Shaadi' }))
  ];
  // Explicit fictional partner-gender rules, editable like all other hard rules.
  people.forEach(person => person.dealbreakers.push(rule('gender', 'eq',
    person.gender === 'man' ? 'woman' : 'man', `Partner gender: ${person.gender === 'man' ? 'woman' : 'man'}`, 'other')));
  people.forEach((person,i) => {
    person.updatedAt=`2026-10-${String(1+(i*7)%19).padStart(2,'0')}T09:30:00.000Z`;
    person.preferencesUpdatedAt=person.updatedAt;
    // Fictional records have no real external identity or source-update evidence.
    person.sourceUrl=person.isClient?'':`https://${person.source.toLowerCase()}.example/profiles/demo-${person.id}`;
    person.sourceProfileId=person.isClient?'':`DEMO-${person.id.toUpperCase()}`;
    person.sourceUrlIsDemo=!person.isClient;person.sourceUpdatedAt=null;
  });
  root.MatchData = { clients, candidates, people };

})(typeof window === 'undefined' ? globalThis : window);
