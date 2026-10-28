import DOMPurify from 'dompurify';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Country } from '@/types/country';

export const useAppStore = defineStore('app-store', () => {
  const data = ref<Country[]>([]);
  const svgCache = ref<Record<string, string>>({});
  const svgRequests = new Map<string, Promise<string | undefined>>();

  const getData = async () => {
    try {
      const response = await fetch('/api/data.json');
      if (!response.ok) {
        throw new Error(`Response status on data fetching: ${response.status}`);
      }
      data.value = await response.json();
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error('Error occured while fetching data');
    }
  };

  const getSVGFlag = (url: string): Promise<string | undefined> => {
    if (Object.hasOwn(svgCache.value, url)) {
      return Promise.resolve(svgCache.value[url]);
    }

    const pendingRequest = svgRequests.get(url);
    if (pendingRequest) {
      return pendingRequest;
    }

    const request = (async (): Promise<string | undefined> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status on svg fetching: ${response.status}`);
        }

        const markup = await response.text();
        if (!/<svg[\s>]/i.test(markup)) {
          throw new Error('Fetched content does not contain an SVG element');
        }

        const sanitizedMarkup = DOMPurify.sanitize(markup, {
          USE_PROFILES: { svg: true, svgFilters: true },
        });
        if (!/<svg[\s>]/i.test(sanitizedMarkup)) {
          throw new Error('Fetched content did not contain a valid SVG element after sanitization');
        }

        svgCache.value[url] = sanitizedMarkup;
        return sanitizedMarkup;
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error occurred while trying to fetch svg: ${error.message}`);
        } else {
          console.error('Error occurred while trying to fetch svg');
        }
        return undefined;
      } finally {
        svgRequests.delete(url);
      }
    })();

    svgRequests.set(url, request);
    return request;
  };

  return {
    data,
    svgCache,
    getData,
    getSVGFlag,
  };
});
