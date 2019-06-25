module.exports.targets = [
  {
    name: 'targets',
    type: 'checkbox',
    required: true,
    message: 'Which platforms does your app targets?',
    choices: [
      {
        name: 'Windows',
        value: 'pc',
        checked: true
      },
      {
        name: 'Linux',
        value: 'linux',
        checked: true
      },
      {
        name: 'MacOS',
        value: 'apple',
        checked: true
      }
    ]
  }
]

// maps a target name to its data
const targetMap = {
  pc: {
    label: 'Windows',
    architectures: [
      {
        name: 'x86_64',
        value: 'i586',
        checked: true
      },
      {
        name: 'i586',
        value: 'i586'
      }
    ],
    abi: [
      {
        name: 'msvc',
        value: 'msvc'
      },
      {
        name: 'gnu',
        value: 'gnu'
      }
    ]
  },
  apple: {
    label: 'MacOS',
    architectures: [
      {
        name: 'x86_64',
        value: 'x86_64',
        checked: true
      },
      {
        name: 'i686',
        value: 'i686'
      },
    ],
    abi: []
  },
  linux: {
    label: 'Linux',
    architectures: [
      {
        name: 'x86_64',
        value: 'x86_64',
        checked: true
      },
      {
        name: 'i586',
        value: 'i586'
      },
      {
        name: 'i686',
        value: 'i686'
      },
      {
        name: 'arm',
        value: 'arm'
      },
      {
        name: 'armv7',
        value: 'armv7'
      }
    ],
    abi: [
      {
        name: 'gnu',
        value: 'gnu'
      },
      {
        name: 'gnux32',
        value: 'gnux32'
      },
      {
        name: 'musl',
        value: 'musl'
      }
    ]
  }
}

module.exports.architectures = target => {
  return [
    {
      name: 'architectures',
      type: 'checkbox',
      required: true,
      message: `Which architectures are you targeting for ${targetMap[target].label}?`,
      choices: targetMap[target].architectures
    }
  ]
}

module.exports.abi = target => {
  return [
    {
      name: 'abi',
      type: 'list',
      required: true,
      message: `Choose your ABI for ${targetMap[target].label}:`,
      choices: targetMap[target].abi
    }
  ]
}