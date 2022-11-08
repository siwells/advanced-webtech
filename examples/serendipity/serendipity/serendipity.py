from flask import Flask, request, jsonify
import random, json

app = Flask(__name__)

@app.route("/")
def index():
    return """
    <h1>A Serendipity API & Inteface</h1>

    <p>Visit the <a href="/query/">query interface</a> for a browser based experience.</p>
    <p>Use the HTTP/JSON API to retrieve JSON documents containing useful data:</p>

    <ul>
        <li><a href="/magic8ball/">[GET] /magic8ball/</a> - This will return a different Magic 8 Ball response as a JSON document each time it is called.</li>
        <li><a href="/magic8ball/">[POST] /magic8ball/</a> - This will return a different Magic 8 Ball response as a JSON document each time it is called. To use this route you must POST a request formatted as a JSON document. You can use the cURL tool to do this:<br />
        <code>$ curl -v  -H "Content-Type: application/json" http://0.0.0.0:5000/magic8ball/ -d '{"question":"daka?"}'</code><br />
        which should yield a response like this:<br /> 
        <code>{"answer": "You may rely on it.", "question": "daka?"}</code></li>
        <li><a href="/oblique/">[GET] Oblique</a> - This will return a different Magic 8 Ball response as a JSON document each time it is called.</li>
    </ul>
    """, 200    


@app.route("/query/", methods=['GET', 'POST'])
def query():

    if request.method == 'POST':
        page='''
            <!DOCTYPE html>
            <html><body>
            <h1>Your question was:
        '''
        page+=request.form['question']
        page+='''
            </h1>
            <h1>Your answer is:
        '''
        page+= amalgamate()
        page+='''
            </h1>
            <body></html>

        '''        
        return page
        
    else:
        page='''
            <!DOCTYPE html>
            <html><body>
                <form action="" method="post" name="form">
                    <label for="question">Question:</label>
                    <input type="text" name="question" id="question"/>
                    <input type="submit" name="submit" id="submit"/>
                </form>
            <body></html>
        '''
        return page


@app.route("/magic8ball/", methods=['GET','POST'])
def magic8ball_page():

    if request.method == 'POST':

        question = request.get_json().get("question")
        
        data = {
            "question": question,
            "answer": magic8ball()
        }
        return jsonify(data), 200

    else:
        data = {
            "answer": magic8ball()
        }

        return jsonify(data), 200


@app.route("/oblique/")
def oblique_strategies_page():

    data = {
        "strategy": oblique_strategies()
    }

    return jsonify(data), 200



def magic8ball():
    responses = [
        "It is certain.", 
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
	    "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful."
    ]
    return random.choice(responses)

def oblique_strategies():
    strategies = [
        "Abandon normal instruments",
        "Accept advice",
        "Accretion",
        "A line has two sides",
        "Allow an easement (an easement is the abandonment of a stricture)",
        "Are there sections? Consider transitions",
        "Ask people to work against their better judgment",
        "Ask your body",
        "Assemble some of the instruments in a group and treat the group",
        "Balance the consistency principle with the inconsistency principle",
        "Be dirty",
        "Breathe more deeply",
        "Bridges -build -burn",
        "Cascades",
        "Change instrument roles",
        "Change nothing and continue with immaculate consistency",
        "Children's voices -speaking -singing",
        "Cluster analysis",
        "Consider different fading systems",
        "Consult other sources -promising -unpromising",
        "Convert a melodic element into a rhythmic element",
        "Courage!",
        "Cut a vital connection",
        "Decorate, decorate",
        "Define an area as `safe' and use it as an anchor",
        "Destroy -nothing -the most important thing",
        "Discard an axiom",
        "Disconnect from desire",
        "Discover the recipes you are using and abandon them",
        "Distorting time",
        "Do nothing for as long as possible",
        "Don't be afraid of things because they're easy to do",
        "Don't be frightened of cliches",
        "Don't be frightened to display your talents",
        "Don't break the silence",
        "Don't stress one thing more than another",
        "Do something boring",
        "Do the washing up",
        "Do the words need changing?",
        "Do we need holes?",
        "Emphasize differences",
        "Emphasize repetitions",
        "Emphasize the flaws",
        "Faced with a choice, do both (given by Dieter Roth)",
        "Feedback recordings into an acoustic situation",
        "Fill every beat with something",
        "Get your neck massaged",
        "Ghost echoes",
        "Give the game away",
        "Give way to your worst impulse",
        "Go slowly all the way round the outside",
        "Honor thy error as a hidden intention",
        "How would you have done it?",
        "Humanize something free of error",
        "Imagine the music as a moving chain or caterpillar",
        "Imagine the music as a set of disconnected events",
        "Infinitesimal gradations",
        "Intentions -credibility of -nobility of -humility of",
        "Into the impossible",
        "Is it finished?",
        "Is there something missing?",
        "Is the tuning appropriate?",
        "Just carry on",
        "Left channel, right channel, center channel",
        "Listen in total darkness, or in a very large room, very quietly",
        "Listen to the quiet voice",
        "Look at a very small object; look at its center",
        "Look at the order in which you do things",
        "Look closely at the most embarrassing details and amplify them",
        "Lowest common denominator check -single beat -single note -single",
        "riff",
        "Make a blank valuable by putting it in an exquisite frame",
        "Make an exhaustive list of everything you might do and do the last",
        "thing on the list",
        "Make a sudden, destructive, unpredictable action; incorporate",
        "Mechanicalize something idiosyncratic",
        "Mute and continue",
        "Only one element of each kind",
        "(Organic) machinery",
        "Overtly resist change",
        "Put in earplugs",
        "Remember those quiet evenings",
        "Remove ambiguities and convert to specifics",
        "Remove specifics and convert to ambiguities",
        "Repetition is a form of change",
        "Reverse",
        "Short circuit",
        "improve his virility shovels them straight into his lap)",
        "Shut the door and listen from outside",
        "Simple subtraction",
        "Spectrum analysis",
        "Take a break",
        "Take away the elements in order of apparent non-importance",
        "Tape your mouth (given by Ritva Saarikko)",
        "The inconsistency principle",
        "The tape is now the music",
        "Think of the radio",
        "Tidy up",
        "Trust in the you of now",
        "Turn it upside down",
        "Twist the spine",
        "Use an old idea",
        "Use an unacceptable color",
        "Use fewer notes",
        "Use filters",
        "Use 'unqualified' people",
        "Water",
        "What are you really thinking about just now? Incorporate",
        "What is the reality of the situation?",
        "What mistakes did you make last time?",
        "What would your closest friend do?",
        "What wouldn't you do?",
        "Work at a different speed",
        "You are an engineer",
        "You can only make one dot at a time",
        "You don't have to be ashamed of using your own ideas",
        "[blank white card]"        
    ]
    return random.choice(strategies)

def amalgamate():
    functions = [magic8ball, oblique_strategies]
    return random.choice(functions)()

if __name__ == "__main__":
    app.run(host="0.0.0.0")
