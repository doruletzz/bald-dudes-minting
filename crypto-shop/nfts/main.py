import random 
import cairosvg
import json

names = 'Cooper Kyson Raymond Morgan Jude Scott Timothy Karson Shane Jaydan Blaine Ian Steve Jake Malik Ralph Javon Ryder Edwin Memphis Leland Keenan Landin Ezequiel Moshe Gavin Adrien Tristan Porter Lucas Korbin Gerardo Uriel Zavier Yahir Randy Tyson Addison Lawson Arnav Salvatore Denzel Mark Alexis Jabari Jasiah Royce Kasey Grady Bryan Case Abram Andrew Giovanni Alonzo Maddox Albert Atticus Nathaniel Sammy Gary Bo Demarion Isaac Toby Chaz Danny German Brodie Edgar Davin Trace Riley Sheldon Nehemiah Josh Isaias Markus Conrad Dario Emilio Jay Cory Bryant Roger Jalen Carlo Will Darrell Jaquan Trystan Kolby Pierce Kade Nelson Ricardo Dylan Dean Eugene Kellen'.split(' ')

original_colors = {     'bg'      : '#e8e33a', 
                        'shirt'   : '#cf21e8',
                        'skin'    : '#93c8d8',
                        'eyebrow' : '#edf225',
                        'eye'     : '#f4f4f4',
                        'outline' : '#721111'
}

colors_options = {
    'bg'      :  ['#e8e33a', '#e8e33a', '#3ae896', '#e83add'],
    'shirt'   :  ['#567fce', '#d732d4', '#c4492d', '#9dc465'],
    'skin'    :  ['#93c8d8', '#eadbbf'],
    'eyebrow' :  ['#573838', '#3c3939', '#a43939', '#d2cd77'],
    'eye'     :  ['#f4f4f4', '#8b12ce'],
    'outline' :  ['#721111', '#222']
}

colors_weight = {
    'bg'       : [5, 50, 30, 15],
    'shirt'    : [20, 5, 30, 35],
    'skin'     : [10, 90],
    'eyebrow'  : [40, 40, 10, 10],
    'eye'      : [98, 2],
    'outline'  : [30, 70]
}

def readSVG(file):
    fin = open(file, "rt")
    data = fin.read()
    fin.close()
    return data

def generateNftDetails():
    bg = random.choices(colors_options['bg'],colors_weight['bg'],k=1)[0]
    shirt = random.choices(colors_options['shirt'],colors_weight['shirt'],k=1)[0]
    skin = random.choices(colors_options['skin'],colors_weight['skin'],k=1)[0]
    eyebrow = random.choices(colors_options['eyebrow'],colors_weight['eyebrow'],k=1)[0]
    eye = random.choices(colors_options['eye'],colors_weight['eye'],k=1)[0]
    outline = random.choices(colors_options['outline'],colors_weight['outline'],k=1)[0]

    return [bg,shirt,skin,eyebrow,eye,outline]



def generateNFTs(nr):
    choices = []
    for i in range(0,nr):
        random.seed(i)

        fin = open('bald_dude.svg', "rt")
        data = fin.read()
        fin.close()
        aux = data

        choice = generateNftDetails()
        while choice in choices:
            choice = generateNftDetails()

        choices.append(choice)

        bg,shirt,skin,eyebrow,eye,outline = choice[0], choice[1], choice[2], choice[3], choice[4], choice[5]
        print(choice)

        data = data.replace('{}'.format(original_colors["bg"]), bg)
        data = data.replace('{};'.format(original_colors['skin']), skin)
        data = data.replace('{};'.format(original_colors['shirt']), shirt)
        data = data.replace('{};'.format(original_colors['eyebrow']), eyebrow)
        data = data.replace('{};'.format(original_colors['eye']), eye)
        data = data.replace('{}'.format(original_colors['outline']), outline)

        writeSVG('out/bald_dude{}.svg'.format(i), data)
        writePNG('out/bald_dude{}.svg'.format(i), 'out/bald_dude{}.png'.format(i))
        print(names[i])
        writeMeta('out/bald_dude{}.json'.format(i), names[i], 'out/bald_dude{}.png')

def writeMeta(path_to_meta, name, path_to_img):
    meta = {
        'name' : name,
        'description' : 'just another regular bald dude' ,
        'image' : path_to_img
    }

    data = json.dumps(meta)
    
    fin = open(path_to_meta , "w")
    fin.write(data)
    fin.close()




def writeSVG(file, data):
    fin = open(file, "w")
    fin.write(data)
    fin.close()

def writePNG(path_to_svg, path_to_png):
    cairosvg.svg2png(url=path_to_svg, write_to=path_to_png)


data = readSVG('bald_dude.svg')
generateNFTs(100)

# data = data.replace('{};'.format(original_colors['shirt']), '#ff00ff;')

# writeSVG('bald_dude2.svg', data)
