<script setup lang="ts">
import type { PropType } from "vue";
import LinkCard from "~/components/markdown/LinkCard.vue";

const props = defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String as PropType<
      "_blank" | "_parent" | "_self" | "_top" | string | null | undefined
    >,
    default: undefined,
    required: false,
  },
});

function isGithubRepoLink(link: string): boolean {
  // GitHub 仓库链接的格式为 https://github.com/username/repo
  const regex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
  return regex.test(link);
}

function openLink() {
  window.open(props.href, props.target as string);
}

const computedHref = computed(() => {
  const link = props.href;
  if (link.includes("@")) {
    return link;
  }
  const urlReg =
    /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
  const url = urlReg.exec(link);
  if (!url) return null;

  return url[0];
});

const source = ref(props.href)

const { copy } = useClipboard({ source })

const toast = useToast();

function copyAddress() {
  copy(source.value)
  toast.add({
    title: "Copied",
    description: source.value,
    timeout: 3000,
    icon: "i-heroicons-check-circle text-violet",
  });
}
</script>

<template>
  <LinkCard v-if="isGithubRepoLink(props.href)" :link="href" />
  <div v-else class="mx-1 inline-block align-middle">
    <UPopover
      mode="hover"
      :popper="{ placement: 'top-start' }"
      :ui="{ wrapper: 'inline-flex items-center' }"
    >
      <UButton
        :to="props.href"
        :target="props.target"
        variant="link"
        :ui="{ padding: 'px-0' }"
        @click="openLink"
      >
        {{ computedHref }}
      </UButton>
      <template #panel>
        <div class="h-full w-full mx-2">
          <UButton
            icon="i-ri:external-link-line"
            :to="props.href"
            :target="props.target"
            variant="link"
            :ui="{ padding: 'px-0' }"
            @click="openLink"
          >
            {{ props.href }}
          </UButton>
          <UButton
            icon="i-ri:file-copy-fill"
            variant="link"
            :trailing="false"
            @click="copyAddress"
          >
            Copy
          </UButton>
        </div>
      </template>
    </UPopover>
  </div>
</template>
