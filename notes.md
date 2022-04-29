# slide 2
- Developing uis can be difficult.
- has a lot of challanges
- a lot of them a related to the behaviour of app state and app actions
- even for a small/not complex apps

- we usually think about user taking the happy path
- the rest we will figure out later
- we never figure out the rest

# slide 3
- Let's show this as an example
- seems like a milion $ idea

# slide 11
- Code became much harder to read and understand
- Difficult to discover the flow of the states
- We have a lot of state to manage for a simple app
- Each state can be true/false
- Each boolean flag makes the possible states grow expenentialy
- We have 16 possible state compinations in this component, we want 1!
- should not be able to tranition between all states

# slide 12
- most of us done or doing such a thing

# slide 14
- Seems complex
- Want to talk about FSM
- Been around for many years in electronics/hardware/software

# slide 15
- simplest example using traffic lites

# slide 16
- 3 possible states in a traffic light g y r

# slide 17
- something that is predefined
- will always happen in a single way g -> y -> r
- otherwise we would have accidents

# slide 18
- given current state and action always knows the state
- we cna predict, that after timer g -> y

# slide 20
- only in 1 of 3 states

# slide 21
- always have an initial state
