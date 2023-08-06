import { GET_INTERACTIVE_MESSAGES, GET_TEMPLATES } from '../../graphql/queries/Templates';

export const GET_TEMPLATES_MOCK = {
  request: {
    query: GET_TEMPLATES,
    variables: {
      filter: { term: '' },
      opts: { limit: 30, offset: 0, order: 'ASC' },
    },
  },
  result: {
    data: {
      sessionTemplates: [
        {
          MessageMedia: null,
          __typename: 'SessionTemplate',
          body: 'test {{1}} body',
          bspId: 'test-bsp-id',
          id: '1',
          isActive: true,
          isHsm: true,
          isReserved: false,
          label: 'Test Template',
          language: {
            __typename: 'Language',
            id: '1',
            label: 'English',
          },
          numberParameters: 1,
          reason: null,
          shortcode: 'tt',
          status: 'APPROVED',
          translations:
            '{"2":{"uuid":"f01f0874-f04f-45e8-b99a-c7e982c99ac0","status":"APPROVED","number_parameters":1,"language_id":2,"label":"Account Balance","example":" अब आप नीचे दिए विकल्पों में से एक का चयन करके [003] के साथ समाप्त होने वाले खाते के लिए अपना खाता शेष या मिनी स्टेटमेंट देख सकते हैं। | [अकाउंट बैलेंस देखें] | [देखें मिनी स्टेटमेंट]","body":" अब आप नीचे दिए विकल्पों में से एक का चयन करके {{1}} के साथ समाप्त होने वाले खाते के लिए अपना खाता शेष या मिनी स्टेटमेंट देख सकते हैं। | [अकाउंट बैलेंस देखें] | [देखें मिनी स्टेटमेंट]"}}',
          type: 'TEXT',
          updatedAt: '2023-07-03T06:04:12Z',
        },
        {
          MessageMedia: null,
          __typename: 'SessionTemplate',
          body: 'test speed send body',
          bspId: null,
          id: '2',
          isActive: false,
          isHsm: false,
          isReserved: false,
          label: 'Test Speed send',
          language: {
            __typename: 'Language',
            id: '1',
            label: 'English',
          },
          numberParameters: null,
          reason: null,
          shortcode: null,
          status: null,
          translations: '{}',
          type: 'TEXT',
          updatedAt: '2023-07-09T18:55:18Z',
        },
      ],
    },
  },
};

export const GET_INTERACTIVE_MESSAGES_MOCK = {
  request: {
    query: GET_INTERACTIVE_MESSAGES,
    variables: {
      filter: { label: '' },
      opts: { limit: 30, offset: 0, order: 'ASC' },
    },
  },
  result: {
    data: {
      interactiveTemplates: [
        {
          __typename: 'InteractiveTemplate',
          id: '1',
          interactiveContent:
            '{"type":"quick_reply","options":[{"type":"text","title":"YES"},{"type":"text","title":"NO"}],"content":{"type":"text","text":"test interactive message body","header":"Test interactive message"}}',
          label: 'Test interactive message',
          language: {
            __typename: 'Language',
            id: '1',
            label: 'English',
          },
          sendWithTitle: true,
          translations:
            '{"2":{"type":"quick_reply","options":[{"type":"text","title":"हाँ"},{"type":"text","title":"ना"}],"content":{"type":"text","text":"ग्लिफ़िक सभी न नई सुविधाओं के साथ आता है","header":"आप ग्लिफ़िक के लिए कितने उत्साहित हैं?"}},"1":{"type":"quick_reply","options":[{"type":"text","title":"yes"},{"type":"text","title":"no"}],"content":{"type":"text","text":"Glific comes with all new features","header":"Are you excited for *Glific*?"}}}',
          type: 'QUICK_REPLY',
        },
      ],
    },
  },
};
