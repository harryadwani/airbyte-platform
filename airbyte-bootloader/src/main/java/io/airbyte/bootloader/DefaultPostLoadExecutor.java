/*
 * Copyright (c) 2020-2024 Airbyte, Inc., all rights reserved.
 */

package io.airbyte.bootloader;

import io.airbyte.config.init.ApplyDefinitionsHelper;
import io.airbyte.config.init.DeclarativeSourceUpdater;
import io.airbyte.config.init.PostLoadExecutor;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

/**
 * Default implementation of the tasks that should be executed after a successful bootstrapping of
 * the Airbyte environment.
 * <p>
 * <p>
 * This implementation performs the following tasks:
 * <ul>
 * <li>Applies the latest definitions from the provider to the repository</li>
 * <li>If enables, migrates secrets</li>
 * </ul>
 */
@Singleton
@Slf4j
public class DefaultPostLoadExecutor implements PostLoadExecutor {

  private final ApplyDefinitionsHelper applyDefinitionsHelper;
  private final DeclarativeSourceUpdater declarativeSourceUpdater;

  public DefaultPostLoadExecutor(final ApplyDefinitionsHelper applyDefinitionsHelper,
                                 final DeclarativeSourceUpdater declarativeSourceUpdater) {
    this.applyDefinitionsHelper = applyDefinitionsHelper;
    this.declarativeSourceUpdater = declarativeSourceUpdater;
  }

  @Override
  public void execute() throws Exception {
    applyDefinitionsHelper.apply();
    // TODO (ella): Temporarily disabled until semver upgrading is implemented
    // declarativeSourceUpdater.apply();

    log.info("Loaded seed data.");
  }

}
